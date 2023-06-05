using IkeMtz.NRSRx.Core.OData;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.OData.Edm;
using V1 = ITEC5905.Artists.Models.V1;

namespace ITEC5905.Artists.OData.Configuration
{
  public class ODataModelProvider : BaseODataModelProvider
  {
    public static IEdmModel GetV1EdmModel() =>
      ODataEntityModelFactory(builder =>
      {
        _ = builder.EntitySet<V1.Album>($"{nameof(V1.Album)}s");
        _ = builder.EntitySet<V1.AlbumSong>($"{nameof(V1.AlbumSong)}s");
        _ = builder.EntitySet<V1.ArtistGenre>($"{nameof(V1.ArtistGenre)}s");
        _ = builder.EntitySet<V1.Artist>($"{nameof(V1.Artist)}s");
        _ = builder.EntitySet<V1.ArtistSong>($"{nameof(V1.ArtistSong)}s");
        _ = builder.EntitySet<V1.Genre>($"{nameof(V1.Genre)}s");
        _ = builder.EntitySet<V1.Song>($"{nameof(V1.Song)}s");
      });

    public override IDictionary<ApiVersionDescription, IEdmModel> GetModels() =>
        new Dictionary<ApiVersionDescription, IEdmModel>
        {
          [ApiVersionFactory(1, 0)] = GetV1EdmModel(),
        };
  }
}
