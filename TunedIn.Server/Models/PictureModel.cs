using System;
using System.ComponentModel.DataAnnotations;

namespace TunedIn.Server.Models
{
  public class Picture
  {
    [Key]
    public int Id { get; set; }

    [Required]
    public string FileName { get; set; }

    [Required]
    public string ContentType { get; set; }

    [Required]
    public byte[] ImageData { get; set; }
    public byte[] ThumbnailData { get; set; }

    public long FileSize { get; set; }

    public DateTime UploadDate { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }
  }
}