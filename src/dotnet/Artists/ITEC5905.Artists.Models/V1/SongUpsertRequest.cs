using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public class SongUpsertRequest : IIdentifiable
  {
    public Guid Id { get; set; }
    [Required]
    [MaxLength(255)]
    public string Name { get; set; } 
    public ICollection<Guid>? AlbumIds { get; set; }
    [Required]
    public ICollection<Guid> ArtistIds { get; set; }
    [Required]
    [MaxLength(255)]
    public string GenreId { get; set; } 
    [MaxLength(255)]
    public string IpfsHash { get; set; }
    [MaxLength(255)]
    public string? PictureIpfsHash { get; set; }
    [MaxLength(50)]
    public string? PictureType { get; set; }
  }
}
