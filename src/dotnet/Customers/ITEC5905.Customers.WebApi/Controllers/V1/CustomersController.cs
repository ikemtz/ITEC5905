using IkeMtz.NRSRx.Core.Models;
using IkeMtz.NRSRx.Core.WebApi;
using IkeMtz.NRSRx.Events;
using IkeMtz.NRSRx.Events.Publishers.Redis;
using ITEC5905.Customers.Data;
using ITEC5905.Customers.Models.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace ITEC5905.Customers.WebApi.Controllers.V1
{
  [Route("api/v{version:apiVersion}/[controller].{format}"), FormatFilter]
  [ApiVersion(VersionDefinitions.v1_0)]
  [ApiController]
  [Authorize]
  public class CustomersController : ControllerBase
  {
    private readonly ILogger<CustomersController> _logger;
    private readonly DatabaseContext _databaseContext;
    public CustomersController(DatabaseContext databaseContext, ILogger<CustomersController> logger)
    {
      _databaseContext = databaseContext;
      _logger = logger;
    }

    // Get api/Customers
    [HttpGet]
    [ProducesResponseType(Status200OK, Type = typeof(Customer))]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult> Get([FromQuery] Guid id)
    {
      var dbCustomer = await _databaseContext.Customers
        .AsNoTracking()
        .FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);

      return dbCustomer == null ? NotFound() : Ok(dbCustomer);
    }

    // Post api/Customers
    [HttpPost]
    [ProducesResponseType(Status200OK, Type = typeof(Customer))]
    [ValidateModel]
    public async Task<ActionResult> Post([FromBody] CustomerUpsertRequest request, [FromServices] IPublisher<Customer, CreatedEvent> publisher)
    {
      var value = SimpleMapper<CustomerUpsertRequest, Customer>.Instance.Convert(request);
      var dbCustomer = _databaseContext.Customers.Add(value);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(value)
          .ConfigureAwait(false);
      }
      return Ok(dbCustomer.Entity);
    }

    // Put api/Customers
    [HttpPut]
    [ProducesResponseType(Status200OK, Type = typeof(Customer))]
    [ProducesResponseType(Status409Conflict)]
    [ProducesResponseType(Status404NotFound)]
    [ValidateModel]
    public async Task<ActionResult> Put([FromQuery] Guid id, [FromBody] CustomerUpsertRequest request, [FromServices] RedisStreamPublisher<Customer, UpdatedEvent> publisher)
    {
      if (id != request.Id)
      {
        _logger.LogWarning("Id values in querystring and post data do not match.");
        return Conflict($"Id values in query string and post data do not match.");
      }
      var dbCustomer = await _databaseContext.Customers.FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);
      if (dbCustomer == null)
      {
        _logger.LogWarning("Customer with Id: {id} was not found.", id);
        return NotFound($"{nameof(Customer)} with Id: {id} was not found.");
      }
      SimpleMapper<CustomerUpsertRequest, Customer>.Instance.ApplyChanges(request, dbCustomer);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(dbCustomer)
          .ConfigureAwait(false);
      }
      return Ok(dbCustomer);
    }

    // Put api/Customers
    [HttpDelete]
    [ProducesResponseType(Status200OK)]
    [ProducesResponseType(Status404NotFound)]
    public async Task<ActionResult> Delete([FromQuery] Guid id, [FromServices] RedisStreamPublisher<Customer, DeletedEvent> publisher)
    {
      var dbCustomer = await _databaseContext.Customers.FirstOrDefaultAsync(t => t.Id == id)
        .ConfigureAwait(false);
      if (dbCustomer == null)
      {
        _logger.LogWarning("Customer with Id: {id} was not found.", id);
        return NotFound($"{nameof(Customer)} with Id: {id} was not found.");
      }
      _ = _databaseContext.Remove(dbCustomer);
      var recordCount = await _databaseContext.SaveChangesAsync()
          .ConfigureAwait(false);
      if (recordCount > 0)
      {
        await publisher.PublishAsync(dbCustomer)
          .ConfigureAwait(false);
      }
      return Ok();
    }
  }
}
