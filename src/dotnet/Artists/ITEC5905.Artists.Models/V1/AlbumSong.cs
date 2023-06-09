﻿using IkeMtz.NRSRx.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace ITEC5905.Artists.Models.V1
{
  public class AlbumSong : IIdentifiable, IAuditable
  {
    public Guid Id { get; set; }
    [Required]
    public Guid AlbumId { get; set; }
    public Album Album { get; set; }
    [Required]
    public Guid SongId { get; set; }
    public Song Song { get; set; }
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
