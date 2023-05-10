using IkeMtz.NRSRx.Core;
using ITEC5905.Artists.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

public class DatabaseContextDesignTimeFactory : IDesignTimeDbContextFactory<DatabaseContext>
{
  public DatabaseContext CreateDbContext(string[] args)
  {
    var config = ConfigurationFactory<DatabaseContextDesignTimeFactory>.Create();
    string dbConnString = config.GetValue<string>("DbConnectionString") ?? "Host=localhost";
    var options = new DbContextOptionsBuilder<DatabaseContext>()
      .UseMySql(dbConnString, ServerVersion.Parse("8.0"))
      .Options;
    return new DatabaseContext(options);
  }
}