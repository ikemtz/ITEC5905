using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Customers.Models.V1
{
  public partial class CustomerFavoriteArtist : IIdentifiable, IAuditable
  {
    public Guid Id { get; set; }
    [Required]
    [MinLength(2)]
    [MaxLength(255)]
    public string ArtistsName { get; set; }
    [Required]
    public Guid ArtistId { get; set; }
    [Required]
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; }
    [Required]
    public string CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }
  }
}
