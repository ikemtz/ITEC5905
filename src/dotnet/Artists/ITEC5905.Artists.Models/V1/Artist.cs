using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public partial class Artist : IIdentifiable, IAuditable, ICalculateable
  {
    public Artist()
    {
      Genres = new List<ArtistGenre>();
      Albums = new List<Album>();
      ArtistSongs = new List<ArtistSong>();
    }

    public Guid Id { get; set; }
    [Required]
    [MinLength(2)]
    [MaxLength(255)]
    public string Name { get; set; }
    [Required]
    [MinLength(2)]
    [MaxLength(255)]
    public string StageName { get; set; }
    [Required]
    [EmailAddress]
    [MinLength(2)]
    [MaxLength(255)]
    public string Email { get; set; }
    public virtual ICollection<ArtistGenre> Genres { get; set; }
    public virtual ICollection<Album> Albums { get; set; }
    public virtual ICollection<ArtistSong> ArtistSongs { get; set; }

    public int AlbumCount { get; set; }
    public int SongCount { get; set; }
    [MaxLength(50)]
    public string? PictureType { get; set; }
    [MaxLength(255)]
    public string? PictureIpfsHash { get; set; }
    [Required]
    [MaxLength(255)]
    public string CreatedBy { get; set; }
    [MaxLength(255)]
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }

    public void CalculateValues()
    {
      if (ArtistSongs != null)
      {
        this.SongCount = ArtistSongs.Count;
      }

      if (Albums != null)
      {
        this.AlbumCount = Albums.Count;
      }
    }
  }
}
