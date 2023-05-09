using IkeMtz.NRSRx.Core.OData;
using IkeMtz.NRSRx.Core.Web;
using ITEC5905.Customers.Data;
using ITEC5905.Customers.Models.V1;
using ITEC5905.Customers.OData.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace ITEC5905.Customers.OData
{
    public class Startup : CoreODataStartup
    {
        public override string MicroServiceTitle => $"{nameof(ITEC5905.Customers)} OData Microservice";
        public override Assembly StartupAssembly => typeof(Startup).Assembly;
        public override bool IncludeXmlCommentsInSwaggerDocs => true;
        public override string[] AdditionalAssemblyXmlDocumentFiles => new[] {
      typeof(Customer).Assembly.Location.Replace(".dll", ".xml", StringComparison.InvariantCultureIgnoreCase)
    };

        public override BaseODataModelProvider ODataModelProvider => new ODataModelProvider();

        public Startup(IConfiguration configuration) : base(configuration)
        {
        }
        [ExcludeFromCodeCoverage]
        public override void SetupLogging(IServiceCollection? services = null, IApplicationBuilder? app = null)
        {
            this.SetupApplicationInsights(services);
        }

        [ExcludeFromCodeCoverage]
        public override void SetupDatabase(IServiceCollection services, string dbConnectionString)
        {
            _ = services
              .AddDbContext<DatabaseContext>(x => x.UseMySql(dbConnectionString, ServerVersion.AutoDetect(dbConnectionString)));
        }

        public override void SetupHealthChecks(IServiceCollection services, IHealthChecksBuilder healthChecks)
        {
            _ = healthChecks.AddDbContextCheck<DatabaseContext>();
        }
    }
}
