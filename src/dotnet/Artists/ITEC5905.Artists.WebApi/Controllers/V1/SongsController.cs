using IkeMtz.NRSRx.Core.EntityFramework;
using IkeMtz.NRSRx.Core.Models;
using IkeMtz.NRSRx.Core.WebApi;
using IkeMtz.NRSRx.Events;
using ITEC5905.Artists.Data;
using ITEC5905.Artists.Models.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace ITEC5905.Artists.WebApi.Controllers.V1
{
  [Route("api/v{version:apiVersion}/[controller].{format}"), FormatFilter]
  [ApiVersion(VersionDefinitions.v1_0)]
  [ApiController]
  [Authorize]
  public class SongsController : ControllerBase
  {
    private readonly ILogger<SongsController> _logger;
    private readonly DatabaseContext _databaseContext;
    public SongsController(DatabaseContext databaseContext, ILogger<SongsController> logger)
    {
      _databaseContext = databaseContext;
      _logger = logger;
    }

    // Get api/AlbumSongs
    [HttpGet]
    [ProducesResponseType(Status200OK, Type = typeof(Song))]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult> Get([FromQuery] Guid id)
    {
      var dbSong = await _databaseContext.Songs
        .Include(t => t.ArtistSongs)
        .ThenInclude(t => t.Artist)
        .Include(t => t.AlbumSongs)
        .ThenInclude(t => t.Album)
        .Include(t => t.Genre)
        .AsSplitQuery()
        .AsNoTracking()
        .FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);

      return dbSong == null ? NotFound() : Ok(dbSong);
    }

    // Post api/AlbumSongs
    [HttpPost]
    [ProducesResponseType(Status200OK, Type = typeof(Song))]
    [ValidateModel]
    public async Task<ActionResult> Post([FromBody] SongUpsertRequest request, [FromServices] IPublisher<Song, CreatedEvent> publisher)
    {
      var value = SimpleMapper<SongUpsertRequest, Song>.Instance.Convert(request);
      value.Id = (value.Id == Guid.Empty) ? Guid.NewGuid() : value.Id;

      var dbSong = _databaseContext.Songs.Add(value);
      value.Genre = await _databaseContext.Genres.FirstOrDefaultAsync(t => t.Id == request.GenreId) ?? new Genre() { Id = request.GenreId };

      var dbArtists = await _databaseContext.Artists
        .Include(t => t.ArtistSongs)
        .Where(t => request.ArtistIds.Contains(t.Id))
        .ToListAsync();

      for (int i = 0; i < request.ArtistIds.Count; i++)
      {
        var reqArtistId = request.ArtistIds.ElementAt(i);
        var dbArtist = dbArtists.First(t => t.Id == reqArtistId);
        value.ArtistSongs.Add(new ArtistSong
        {
          ArtistId = reqArtistId,
          Artist = dbArtist,
          Index = i,
          Song = value
        });
        dbArtist.SongCount = dbArtist.ArtistSongs.Count();
      }

      var dbAlbums = await _databaseContext.Albums
        .Include(t=> t.AlbumSongs)
        .Where(t => request.AlbumIds.Contains(t.Id))
        .ToListAsync();

      for (int i = 0; i < request.AlbumIds.Count; i++)
      {
        var reqAlbumId = request.AlbumIds.ElementAt(i);
        var dbAlbum = dbAlbums.First(t => t.Id == reqAlbumId);
        value.AlbumSongs.Add(new AlbumSong
        {
          AlbumId = reqAlbumId,
          Album = dbAlbum, 
          Song = value
        });
        dbAlbum.SongCount = dbAlbum.AlbumSongs.Count();
      }

      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(value)
          .ConfigureAwait(false);
      }
      return Ok(dbSong.Entity);
    }

    // Put api/AlbumSongs
    [HttpPut]
    [ProducesResponseType(Status200OK, Type = typeof(Song))]
    [ProducesResponseType(Status409Conflict)]
    [ProducesResponseType(Status404NotFound)]
    [ValidateModel]
    public async Task<ActionResult> Put([FromQuery] Guid id, [FromBody] SongUpsertRequest request, [FromServices] IPublisher<Song, UpdatedEvent> publisher)
    {
      if (id != request.Id)
      {
        _logger.LogWarning("Id values in querystring and post data do not match.");
        return Conflict($"Id values in query string and post data do not match.");
      }
      var dbSong = await _databaseContext.Songs
        .Include(t => t.Genre)
        .FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);
      if (dbSong == null)
      {
        _logger.LogWarning("Song with Id: {id} was not found.", id);
        return NotFound($"{nameof(Song)} with Id: {id} was not found.");
      }
      SimpleMapper<SongUpsertRequest, Song>.Instance.ApplyChanges(request, dbSong);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(dbSong)
          .ConfigureAwait(false);
      }
      return Ok(dbSong);
    }

    // Put api/AlbumSongs
    [HttpDelete]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult> Delete([FromQuery] Guid id, [FromServices] IPublisher<Song, DeletedEvent> publisher)
    {
      var dbSong = await _databaseContext.Songs
        .Include(t => t.Genre)
        .AsSplitQuery()
        .FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);
      if (dbSong == null)
      {
        _logger.LogWarning("Song with Id: {id} was not found.", id);
        return NotFound($"{nameof(Song)} with Id: {id} was not found.");
      }
      _ = _databaseContext.Remove(dbSong);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(dbSong)
          .ConfigureAwait(false);
      }
      return Ok();
    }
  }
}
