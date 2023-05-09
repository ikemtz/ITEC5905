using Microsoft.EntityFrameworkCore;

namespace ITEC5905.Customers.Data
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }
    }
}
