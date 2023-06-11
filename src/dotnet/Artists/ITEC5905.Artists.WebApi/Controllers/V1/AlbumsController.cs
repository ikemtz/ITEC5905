using IkeMtz.NRSRx.Core.EntityFramework;
using IkeMtz.NRSRx.Core.Models;
using IkeMtz.NRSRx.Core.WebApi;
using IkeMtz.NRSRx.Events;
using ITEC5905.Artists.Data;
using ITEC5905.Artists.Models.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace ITEC5905.Artists.WebApi.Controllers.V1
{
  [Route("api/v{version:apiVersion}/[controller].{format}"), FormatFilter]
  [ApiVersion(VersionDefinitions.v1_0)]
  [ApiController]
  [Authorize]
  public class AlbumsController : ControllerBase
  {
    private readonly ILogger<ArtistsController> _logger;
    private readonly DatabaseContext _databaseContext;
    public AlbumsController(DatabaseContext databaseContext, ILogger<ArtistsController> logger)
    {
      _databaseContext = databaseContext;
      _logger = logger;
    }

    // Get api/Albums
    [HttpGet]
    [ProducesResponseType(Status200OK, Type = typeof(Album))]
    [ProducesResponseType(Status404NotFound, Type = typeof(ProblemDetails))]
    public async Task<ActionResult<Album>> Get([FromQuery] Guid id)
    {
      Album? dbAlbum = await GetAlbum(id).ConfigureAwait(false);
      return dbAlbum == null ?
        NotFound(new ProblemDetails { Title = $"{nameof(Album)} with Id: {id} was not found." }) :
        Ok(dbAlbum);
    }

    private async Task<Album?> GetAlbum(Guid id)
    {
      var dbAlbum = await _databaseContext.Albums
        .Include(t => t.Artist)
        .Include(t => t.AlbumSongs)
        .AsSplitQuery()
        .AsNoTracking()
        .FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);

      _logger.LogWarning("Album with Id: {id} was not found.", id);
      return dbAlbum;
    }

    // Post api/Albums
    [HttpPost]
    [ProducesResponseType(Status200OK, Type = typeof(Album))]
    [ValidateModel]
    public async Task<ActionResult<Album>> Post([FromBody] AlbumUpsertRequest request, [FromServices] IPublisher<Album, CreatedEvent> publisher)
    {
      var value = SimpleMapper<AlbumUpsertRequest, Album>.Instance.Convert(request);
      value.Id = (value.Id == Guid.Empty) ? Guid.NewGuid() : value.Id;
      var dbArtist = await _databaseContext.Artists.Include(t=> t.Albums).FirstAsync(t => t.Id == value.ArtistId);
      var dbAlbum = _databaseContext.Albums.Add(value);
      dbAlbum.Entity.Artist = dbArtist;
      dbArtist.AlbumCount = dbArtist.Albums.Count();
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(value)
          .ConfigureAwait(false);
      }
      return Ok(dbAlbum.Entity);
    }

    // Put api/Albums
    [HttpPut]
    [ProducesResponseType(Status200OK, Type = typeof(Album))]
    [ProducesResponseType(Status409Conflict, Type = typeof(ProblemDetails))]
    [ProducesResponseType(Status404NotFound, Type = typeof(ProblemDetails))]
    [ValidateModel]
    public async Task<ActionResult<Album>> Put([FromQuery] Guid id, [FromBody] AlbumUpsertRequest request, [FromServices] IPublisher<Album, UpdatedEvent> publisher)
    {
      if (id != request.Id)
      {
        _logger.LogWarning("Id values in querystring and post data do not match.");
        return Conflict(new ProblemDetails { Title = $"Id values in query string and post data do not match." });
      }
      var dbAlbum = await GetAlbum(id);
      if (dbAlbum == null)
      {
        return NotFound(new ProblemDetails { Title = $"{nameof(Album)} with Id: {id} was not found." });
      }
      SimpleMapper<AlbumUpsertRequest, Album>.Instance.ApplyChanges(request, dbAlbum);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      var dbArtist = await _databaseContext.Artists.Include(t => t.Albums).FirstAsync(t => t.Id == request.ArtistId);
      dbArtist.AlbumCount = dbArtist.Albums.Count();
      if (recordCount > 0)
      {
        await publisher.PublishAsync(dbAlbum)
          .ConfigureAwait(false);
      }
      return Ok(dbAlbum);
    }

    // Put api/Albums
    [HttpDelete]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status404NotFound, Type = typeof(ProblemDetails))]
    public async Task<ActionResult> Delete([FromQuery] Guid id, [FromServices] IPublisher<Album, DeletedEvent> publisher)
    {
      var dbAlbum = await GetAlbum(id);
      if (dbAlbum == null)
      {
        return NotFound(new ProblemDetails { Title = $"{nameof(Album)} with Id: {id} was not found." });
      }
      _ = _databaseContext.Remove(dbAlbum);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(dbAlbum)
          .ConfigureAwait(false);
      }
      return Ok();
    }
  }
}
