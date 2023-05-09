using Microsoft.EntityFrameworkCore;
using V1 = ITEC5905.Customers.Models.V1;

namespace ITEC5905.Customers.Data
{
    public partial class DatabaseContext
    {
        public virtual DbSet<V1.Customer> Customers { get; set; }
    }
}
