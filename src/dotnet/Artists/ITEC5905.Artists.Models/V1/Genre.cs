using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public class Genre : IIdentifiable<string>, IAuditable
  {
    [Required]
    [MaxLength(255)]
    public string Id { get; set; }
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
