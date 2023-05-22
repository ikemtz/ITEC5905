using IkeMtz.NRSRx.Core.Web;
using IkeMtz.NRSRx.Core.WebApi;
using IkeMtz.NRSRx.Events;
using IkeMtz.NRSRx.Events.Publishers.Redis;
using ITEC5905.Customers.Data;
using ITEC5905.Customers.Models.V1;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace ITEC5905.Customers.WebApi
{
  public class Startup : CoreWebApiStartup
  {
    public override string MicroServiceTitle => $"{nameof(ITEC5905.Customers)} WebApi Microservice";
    public override Assembly StartupAssembly => typeof(Startup).Assembly;
    public override bool IncludeXmlCommentsInSwaggerDocs => true;
    public override string[] AdditionalAssemblyXmlDocumentFiles => new[] {
      typeof(Customer).Assembly.Location.Replace(".dll", ".xml", StringComparison.InvariantCultureIgnoreCase)
    };

    public Startup(IConfiguration configuration) : base(configuration) { }

    [ExcludeFromCodeCoverage]
    public override void SetupDatabase(IServiceCollection services, string dbConnectionString)
    {
      _ = services
        .AddDbContext<DatabaseContext>(x => x.UseMySql(dbConnectionString, ServerVersion.AutoDetect(dbConnectionString)));
    }

    [ExcludeFromCodeCoverage]
    public override void SetupLogging(IServiceCollection? services = null, IApplicationBuilder? app = null)
    {
      this.SetupApplicationInsights(services);
    }

    public override void SetupHealthChecks(IServiceCollection services, IHealthChecksBuilder healthChecks)
    {
      _ = healthChecks
        .AddDbContextCheck<DatabaseContext>()
        .AddRedis(Configuration.GetValue<string>("REDIS_CONNECTION_STRING"));
    }

    [ExcludeFromCodeCoverage]
    public override void SetupPublishers(IServiceCollection services)
    {
      var redisConnectionString = Configuration.GetValue<string>("REDIS_CONNECTION_STRING");

      var connectionMultiplexer = ConnectionMultiplexer.Connect(redisConnectionString);
      _ = services.AddSingleton<IPublisher<Customer, CreatedEvent>>((x) => new RedisStreamPublisher<Customer, CreatedEvent>(connectionMultiplexer));
      _ = services.AddSingleton<IPublisher<Customer, UpdatedEvent>>((x) => new RedisStreamPublisher<Customer, UpdatedEvent>(connectionMultiplexer));
      _ = services.AddSingleton<IPublisher<Customer, DeletedEvent>>((x) => new RedisStreamPublisher<Customer, DeletedEvent>(connectionMultiplexer));

    }
  }
}
