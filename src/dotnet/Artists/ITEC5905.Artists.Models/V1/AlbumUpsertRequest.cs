using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public partial class AlbumUpsertRequest
  {
    public Guid Id { get; set; }
    [Required]
    [MaxLength(255)]
    public string Name { get; set; }
    [Required]
    public Guid ArtistId { get; set; }

    [MaxLength(255)]
    public string? PictureIpfsHash { get; set; }
    [MaxLength(50)]
    public string? PictureType { get; set; }
  }
}
