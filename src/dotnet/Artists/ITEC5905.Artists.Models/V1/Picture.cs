using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public class Picture : IIdentifiable, IAuditable
  {
    public Guid Id { get; set; }

    public Guid ReferenceId { get; set; }
    /// <summary>
    /// Max length is 1 Megabyte
    /// </summary>
    [Required]
    [MaxLength(100_000_000)]
    public byte[] Blob { get; set; }
    [Required]
    [MaxLength(5)]
    public string Type { get; set; }
    [Required]
    public string CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }
  }
}
