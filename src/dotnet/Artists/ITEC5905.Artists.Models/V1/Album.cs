using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public partial class Album : IIdentifiable, IAuditable, ICalculateable
  {
    public Guid Id { get; set; }
    [Required]
    [MaxLength(255)]
    public string Name { get; set; }
    [Required]
    public Guid ArtistId { get; set; }
    public Artist Artist { get; set; }
    public virtual ICollection<AlbumSong> Songs { get; set; }
    public int SongCount { get; set; }

    public Guid? PictureId { get; set; }
    public Picture? Picture { get; set; }
    [Required]
    public string CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }

    public void CalculateValues()
    {
      if (Songs != null)
      {
        this.SongCount = Songs.Count;
      }
    }
  }
}
