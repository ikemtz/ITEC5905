using IkeMtz.NRSRx.Core.Models;
using ITEC5905.Customers.Data;
using ITEC5905.Customers.Models.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace ITEC5905.Customers.OData.Controllers.V1
{
    [ApiVersion("1.0")]
    [Authorize]
    [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 600)]
    public class CustomersController : ODataController
    {
        private readonly DatabaseContext _databaseContext;

        public CustomersController(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [ProducesResponseType(typeof(ODataEnvelope<Customer, Guid>), Status200OK)]
        [EnableQuery(MaxTop = 100, AllowedQueryOptions = AllowedQueryOptions.All)]
        [HttpGet]
        public IQueryable<Customer> Get()
        {
            return _databaseContext.Customers
              .AsNoTracking();
        }
    }
}
