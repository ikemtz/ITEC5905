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
  public class SongsController : ODataController
  {
    private readonly DatabaseContext _databaseContext;

    public SongsController(DatabaseContext databaseContext)
    {
      _databaseContext = databaseContext;
    }

    [ProducesResponseType(typeof(ODataEnvelope<Song, Guid>), Status200OK)]
    [EnableQuery(MaxTop = 100, AllowedQueryOptions = AllowedQueryOptions.All)]
    [HttpGet]
    public IQueryable<Song> Get()
    {
      return _databaseContext.Songs
        .AsNoTracking();
    }
  }
}
