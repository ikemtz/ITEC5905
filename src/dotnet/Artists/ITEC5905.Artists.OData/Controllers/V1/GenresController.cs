using IkeMtz.NRSRx.Core.Models;
using ITEC5905.Artists.Data;
using ITEC5905.Artists.Models.V1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using static Microsoft.AspNetCore.Http.StatusCodes;

namespace ITEC5905.Artists.OData.Controllers.V1
{
  [ApiVersion("1.0")]
  [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 600)]
  public class GenresController : ODataController
  {
    private readonly DatabaseContext _databaseContext;

    public GenresController(DatabaseContext databaseContext)
    {
      _databaseContext = databaseContext;
    }

    [ProducesResponseType(typeof(ODataEnvelope<Genre, String>), Status200OK)]
    [EnableQuery(MaxTop = 100, AllowedQueryOptions = AllowedQueryOptions.All)]
    [HttpGet]
    public IQueryable<Genre> Get()
    {
      return _databaseContext.Genres
        .AsNoTracking();
    }
  }
}
