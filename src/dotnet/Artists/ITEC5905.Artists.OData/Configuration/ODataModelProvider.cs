using IkeMtz.NRSRx.Core.OData;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.OData.Edm;
using System.Collections.Generic;
using V1 = ITEC5905.Artists.Models.V1;

namespace ITEC5905.Artists.OData.Configuration
{
    public class ODataModelProvider : BaseODataModelProvider
    {
        public static IEdmModel GetV1EdmModel() =>
          ODataEntityModelFactory(builder =>
          {
              _ = builder.EntitySet<V1.Artist>($"{nameof(V1.Artist)}s");
          });

        public override IDictionary<ApiVersionDescription, IEdmModel> GetModels() =>
            new Dictionary<ApiVersionDescription, IEdmModel>
            {
                [ApiVersionFactory(1, 0)] = GetV1EdmModel(),
            };
    }
}
