using Microsoft.EntityFrameworkCore;
using V1 = ITEC5905.Artists.Models.V1;

namespace ITEC5905.Artists.Data
{
    public partial class DatabaseContext
    {
        public virtual DbSet<V1.Artist> Artists { get; set; }
    }
}
