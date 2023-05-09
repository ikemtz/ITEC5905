using IkeMtz.NRSRx.Core.Web;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace ITEC5905.Customers.WebApi
{
    [ExcludeFromCodeCoverage]
    public class VersionDefinitions : IApiVersionDefinitions
    {
        public const string v1_0 = "1.0";

        public IEnumerable<string> Versions => new[] { v1_0 };
    }
}
