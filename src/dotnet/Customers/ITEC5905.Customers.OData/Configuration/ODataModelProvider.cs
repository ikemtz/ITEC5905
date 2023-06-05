using IkeMtz.NRSRx.Core.OData;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.OData.Edm;
using V1 = ITEC5905.Customers.Models.V1;

namespace ITEC5905.Customers.OData.Configuration
{
  public class ODataModelProvider : BaseODataModelProvider
  {
    public static IEdmModel GetV1EdmModel() =>
      ODataEntityModelFactory(builder =>
      {
        _ = builder.EntitySet<V1.Customer>($"{nameof(V1.Customer)}s");
        _ = builder.EntitySet<V1.CustomerFavoriteArtist>($"{nameof(V1.CustomerFavoriteArtist)}s");
        _ = builder.EntitySet<V1.CustomerFavoriteGenre>($"{nameof(V1.CustomerFavoriteGenre)}s");
        _ = builder.EntitySet<V1.CustomerPurchase>($"{nameof(V1.CustomerPurchase)}s");
      });

    public override IDictionary<ApiVersionDescription, IEdmModel> GetModels() =>
        new Dictionary<ApiVersionDescription, IEdmModel>
        {
          [ApiVersionFactory(1, 0)] = GetV1EdmModel(),
        };
  }
}
