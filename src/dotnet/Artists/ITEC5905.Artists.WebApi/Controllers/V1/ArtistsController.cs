using IkeMtz.NRSRx.Core.Models;
using IkeMtz.NRSRx.Core.WebApi;
using IkeMtz.NRSRx.Events;
using IkeMtz.NRSRx.Events.Publishers.Redis;
using ITEC5905.Artists.Data;
using ITEC5905.Artists.Models.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace ITEC5905.Artists.WebApi.Controllers.V1
{
    [Route("api/v{version:apiVersion}/[controller].{format}"), FormatFilter]
    [ApiVersion(VersionDefinitions.v1_0)]
    [ApiController]
   // [Authorize]
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
              .AsNoTracking()
              .FirstOrDefaultAsync(t => t.Id == id)
              .ConfigureAwait(false);

            if (dbArtist == null)
            {
                return NotFound();
            }
            return Ok(dbArtist);
        }

        // Post api/Artists
        [HttpPost]
        [ProducesResponseType(Status200OK, Type = typeof(Artist))]
        [ValidateModel]
        public async Task<ActionResult> Post([FromBody] ArtistUpsertRequest request, [FromServices] RedisStreamPublisher<Artist, CreatedEvent> publisher)
        {
            var value = SimpleMapper<ArtistUpsertRequest, Artist>.Instance.Convert(request);
            var dbArtist = _databaseContext.Artists.Add(value);
            var recordCount = await _databaseContext.SaveChangesAsync()
                .ConfigureAwait(false);
            if (recordCount > 0)
            {
                await publisher.PublishAsync(value)
                  .ConfigureAwait(false);
            }
            return Ok(dbArtist.Entity);
        }

        // Put api/Artists
        [HttpPut]
        [ProducesResponseType(Status200OK, Type = typeof(Artist))]
        [ProducesResponseType(Status409Conflict)]
        [ProducesResponseType(Status404NotFound)]
        [ValidateModel]
        public async Task<ActionResult> Put([FromQuery] Guid id, [FromBody] ArtistUpsertRequest request, [FromServices] RedisStreamPublisher<Artist, UpdatedEvent> publisher)
        {
            if (id != request.Id)
            {
                _logger.LogWarning("Id values in querystring and post data do not match.");
                return Conflict($"Id values in query string and post data do not match.");
            }
            var dbArtist = await _databaseContext.Artists.FirstOrDefaultAsync(t => t.Id == id)
              .ConfigureAwait(false);
            if (dbArtist == null)
            {
                _logger.LogWarning("Artist with Id: {id} was not found.", id);
                return NotFound($"{nameof(Artist)} with Id: {id} was not found.");
            }
            SimpleMapper<ArtistUpsertRequest, Artist>.Instance.ApplyChanges(request, dbArtist);
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
        public async Task<ActionResult> Delete([FromQuery] Guid id, [FromServices] RedisStreamPublisher<Artist, DeletedEvent> publisher)
        {
            var dbArtist = await _databaseContext.Artists.FirstOrDefaultAsync(t => t.Id == id)
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
