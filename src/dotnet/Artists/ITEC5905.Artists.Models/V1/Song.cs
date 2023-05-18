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
    [Required]
    public Guid AlbumId { get; set; }
    public Album Album { get; set; }
    public Guid PictureId { get; set; }
    public Picture Picture { get; set; }
    public virtual ICollection<ArtistSong> ArtistSongs { get; set; }
    [Required]
    public string CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }
  }
}
