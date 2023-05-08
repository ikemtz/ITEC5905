using IkeMtz.NRSRx.Core.Web;
using IkeMtz.NRSRx.Core.WebApi;
using IkeMtz.NRSRx.Events;
using IkeMtz.NRSRx.Events.Publishers.Redis;
using ITEC5905.Artists.Data;
using ITEC5905.Artists.Models.V1;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace ITEC5905.Artists.WebApi
{
    public class Startup : CoreWebApiStartup
    {
        public override string MicroServiceTitle => $"{nameof(ITEC5905.Artists)} WebApi Microservice";
        public override Assembly StartupAssembly => typeof(Startup).Assembly;
        public override bool IncludeXmlCommentsInSwaggerDocs => true;
        public override string[] AdditionalAssemblyXmlDocumentFiles => new[] {
      typeof(Artist).Assembly.Location.Replace(".dll", ".xml", StringComparison.InvariantCultureIgnoreCase)
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
            if (!string.IsNullOrWhiteSpace(redisConnectionString))
            {
                var connectionMultiplexer = ConnectionMultiplexer.Connect(redisConnectionString);
                _ = services.AddSingleton<IPublisher<Artist, CreatedEvent>>((x) => new RedisStreamPublisher<Artist, CreatedEvent>(connectionMultiplexer));
                _ = services.AddSingleton<IPublisher<Artist, UpdatedEvent>>((x) => new RedisStreamPublisher<Artist, UpdatedEvent>(connectionMultiplexer));
                _ = services.AddSingleton<IPublisher<Artist, DeletedEvent>>((x) => new RedisStreamPublisher<Artist, DeletedEvent>(connectionMultiplexer));
            }
        }
    }
}
