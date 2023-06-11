using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public partial class Album : IIdentifiable, IAuditable, ICalculateable
  {
    public Album()
    {
      AlbumSongs = new List<AlbumSong>();
    }
    public Guid Id { get; set; }
    [Required]
    [MaxLength(255)]
    public string Name { get; set; }
    [Required]
    public Guid ArtistId { get; set; }
    public Artist Artist { get; set; }
    public virtual ICollection<AlbumSong> AlbumSongs { get; set; }
    public int SongCount { get; set; }
    [MaxLength(255)]
    public string? PictureIpfsHash { get; set; }
    [MaxLength(50)]
    public string? PictureType { get; set; }
    [Required]
    [MaxLength(255)]
    public string CreatedBy { get; set; }
    [MaxLength(255)]
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }

    public void CalculateValues()
    {
      if (AlbumSongs != null)
      {
        this.SongCount = AlbumSongs.Count;
      }
    }
  }
}
