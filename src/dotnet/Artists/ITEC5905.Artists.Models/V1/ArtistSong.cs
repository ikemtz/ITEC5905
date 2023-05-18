﻿using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public class ArtistSong : IIdentifiable, IAuditable
  {
    public Guid Id { get; set; }
    [Required]
    public Guid ArtistId { get; set; }
    public Artist Artist { get; set; }
    [Required]
    public Guid SongId { get; set; }
    public Song Song { get; set; }
    [Required]
    public string CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTimeOffset CreatedOnUtc { get; set; }
    public DateTimeOffset? UpdatedOnUtc { get; set; }
    public int? UpdateCount { get; set; }
  }
}
