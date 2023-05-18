using Microsoft.EntityFrameworkCore;
using V1 = ITEC5905.Artists.Models.V1;

namespace ITEC5905.Artists.Data
{
  public partial class DatabaseContext
  {
    public virtual DbSet<V1.Album> Albums { get; set; }
    public virtual DbSet<V1.AlbumSong> AlbumSongs { get; set; }
    public virtual DbSet<V1.ArtistGenre> ArtistGenres { get; set; }
    public virtual DbSet<V1.Artist> Artists { get; set; }
    public virtual DbSet<V1.ArtistSong> ArtistSongs { get; set; }
    public virtual DbSet<V1.Picture> Pictures { get; set; }
    public virtual DbSet<V1.Song> Songs { get; set; }
  }
}
