using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public partial class Song : IIdentifiable, IAuditable
  {
    public Guid Id { get; set; }
    [Required]
    [MaxLength(255)]
    public string Name { get; set; }
    [MaxLength(255)]
    public string IpfsHash { get; set; }
    [MaxLength(255)]
    public string? PictureIpfsHash { get; set; }
    [MaxLength(50)]
    public string? PictureType { get; set; }
    [Required]
    [MaxLength(255)]
    public string GenreId { get; set; }
    [Required]
    public Genre Genre { get; set; }
    public virtual ICollection<ArtistSong> ArtistSongs { get; set; }
    public virtual ICollection<AlbumSong> AlbumSongs { get; set; }
    [Required]
    [MaxLength(255)]
    public string CreatedBy { get; set; }
    [MaxLength(255)]
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }
  }
}
