using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public partial class ArtistUpsertRequest : IIdentifiable
  {
    public Guid Id { get; set; }
    [Required]
    [MaxLength(255)]
    public string Name { get; set; }
    [Required]
    [MaxLength(255)]
    public string StageName { get; set; }

    public string[] Genres { get; set; }
  }
}