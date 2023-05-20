using IkeMtz.NRSRx.Core.Models;
using ITEC5905.Artists.Data;
using ITEC5905.Artists.Models.V1;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace ITEC5905.Artists.OData.Controllers.V1
{
  [ApiVersion("1.0")]
 // [Authorize]
  [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 600)]
  public class ArtistsController : ODataController
  {
    private readonly DatabaseContext _databaseContext;

    public ArtistsController(DatabaseContext databaseContext)
    {
      _databaseContext = databaseContext;
    }

    [ProducesResponseType(typeof(ODataEnvelope<Artist, Guid>), Status200OK)]
    [EnableQuery(MaxTop = 100, AllowedQueryOptions = AllowedQueryOptions.All)]
    [HttpGet]
    public IQueryable<Artist> Get()
    {
      return _databaseContext.Artists
        .AsNoTracking();
    }
  }
}
