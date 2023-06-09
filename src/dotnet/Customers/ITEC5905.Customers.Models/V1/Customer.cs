using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Customers.Models.V1
{
  public partial class Customer : IIdentifiable, IAuditable
  {
    public Guid Id { get; set; }
    [Required]
    [MinLength(2)]
    [MaxLength(255)]
    public string Name { get; set; }
    [Required]
    [EmailAddress]
    [MinLength(2)]
    [MaxLength(255)]
    public string Email { get; set; }
    public virtual ICollection<CustomerFavoriteArtist> FavoriteArtists { get; set; }
    public virtual ICollection<CustomerFavoriteGenre> FavoriteGenres { get; set; }
    public virtual ICollection<CustomerPurchase> Purchases { get; set; }
    [Required]
    public string CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }
  }
}
