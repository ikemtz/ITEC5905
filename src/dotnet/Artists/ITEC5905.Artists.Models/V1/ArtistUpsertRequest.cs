using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public partial class ArtistUpsertRequest : IIdentifiable
  {
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

    public ICollection<string>? Genres { get; set; }
    [MaxLength(255)]
    public string? PictureIpfsHash { get; set; }
    [MaxLength(50)]
    public string? PictureType { get; set; }
  }
}