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
  public class ArtistsController : ControllerBase
  {
    private readonly ILogger<ArtistsController> _logger;
    private readonly DatabaseContext _databaseContext;
    public ArtistsController(DatabaseContext databaseContext, ILogger<ArtistsController> logger)
    {
      _databaseContext = databaseContext;
      _logger = logger;
    }

    // Get api/Artists
    [HttpGet]
    [ProducesResponseType(Status200OK, Type = typeof(Artist))]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult> Get([FromQuery] Guid id)
    {
      var dbArtist = await _databaseContext.Artists
        .Include(t => t.Genres)
        .AsSplitQuery()
        .AsNoTracking()
        .FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);

      return dbArtist == null ? NotFound() : Ok(dbArtist);
    }

    // Post api/Artists
    [HttpPost]
    [ProducesResponseType(Status200OK, Type = typeof(Artist))]
    [ValidateModel]
    public async Task<ActionResult> Post([FromBody] ArtistUpsertRequest request, [FromServices] IPublisher<Artist, CreatedEvent> publisher)
    {
      var value = SimpleMapper<ArtistUpsertRequest, Artist>.Instance.Convert(request);
      value.Id = (value.Id == Guid.Empty) ? Guid.NewGuid() : value.Id;
      var dbArtist = _databaseContext.Artists.Add(value);

      await SyncGenresAsync(request, value);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(value)
          .ConfigureAwait(false);
      }
      return Ok(dbArtist.Entity);
    }

    private async Task SyncGenresAsync(ArtistUpsertRequest request, Artist dbValue)
    {
      dbValue.Genres?.Clear();
      if (request.Genres != null && request.Genres.Any())
      {
        var generes = await _databaseContext.Genres.Where(t => request.Genres.Contains(t.Id)).ToListAsync();
        request.Genres.ToList().ForEach(t =>
        {
          if (!generes.Any(a => a.Id.ToLower() == t.ToLower()))
          {
            _databaseContext.Genres.Add(new Genre { Id = t });
          }
          dbValue.Genres.Add(new ArtistGenre { Artist = dbValue, GenreId = t });
        });
      }
    }

    // Put api/Artists
    [HttpPut]
    [ProducesResponseType(Status200OK, Type = typeof(Artist))]
    [ProducesResponseType(Status409Conflict)]
    [ProducesResponseType(Status404NotFound)]
    [ValidateModel]
    public async Task<ActionResult> Put([FromQuery] Guid id, [FromBody] ArtistUpsertRequest request, [FromServices] IPublisher<Artist, UpdatedEvent> publisher)
    {
      if (id != request.Id)
      {
        _logger.LogWarning("Id values in querystring and post data do not match.");
        return Conflict($"Id values in query string and post data do not match.");
      }
      var dbArtist = await _databaseContext.Artists
        .Include(t => t.Genres)
        .FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);
      if (dbArtist == null)
      {
        _logger.LogWarning("Artist with Id: {id} was not found.", id);
        return NotFound($"{nameof(Artist)} with Id: {id} was not found.");
      }
      SimpleMapper<ArtistUpsertRequest, Artist>.Instance.ApplyChanges(request, dbArtist);
      await SyncGenresAsync(request, dbArtist);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(dbArtist)
          .ConfigureAwait(false);
      }
      return Ok(dbArtist);
    }

    // Put api/Artists
    [HttpDelete]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult> Delete([FromQuery] Guid id, [FromServices] IPublisher<Artist, DeletedEvent> publisher)
    {
      var dbArtist = await _databaseContext.Artists
        .Include(t => t.Genres)
        .AsSplitQuery()
        .FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);
      if (dbArtist == null)
      {
        _logger.LogWarning("Artist with Id: {id} was not found.", id);
        return NotFound($"{nameof(Artist)} with Id: {id} was not found.");
      }
      _ = _databaseContext.Remove(dbArtist);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(dbArtist)
          .ConfigureAwait(false);
      }
      return Ok();
    }
  }
}
