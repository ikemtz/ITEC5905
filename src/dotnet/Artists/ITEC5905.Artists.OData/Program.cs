using IkeMtz.NRSRx.Core.Web;
using Microsoft.Extensions.Hosting;
using System.Diagnostics.CodeAnalysis;

namespace ITEC5905.Artists.OData
{
    [ExcludeFromCodeCoverage]
    public static class Program
    {
        public static void Main()
        {
            CoreWebStartup.CreateDefaultHostBuilder<Startup>().UseLogging().Build().Run();
        }
    }
}
