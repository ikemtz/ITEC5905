using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Customers.Models.V1
{
  public partial class CustomerUpsertRequest : IIdentifiable
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
  }
}