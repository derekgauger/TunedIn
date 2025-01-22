using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TunedIn.Server.Data;
using TunedIn.Server.Models;
using TunedIn.Server.Services;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;

[ApiController]
[Route("api/[controller]")]
public class ProtectedGalleryController : ControllerBase
{
  private readonly ApplicationDbContext _context;
  private readonly long _fileSizeLimit = 10 * 1024 * 1024; // 10MB limit
  private readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif" };
  private readonly ILoggingService _loggingService;



  public ProtectedGalleryController(ApplicationDbContext context, ILoggingService loggingService)
  {
    _context = context;
    _loggingService = loggingService;
  }

  [HttpPost("upload")]
  public async Task<IActionResult> UploadPicture([FromForm] IFormFile file, [FromForm] string title = "", [FromForm] string description = "")
  {
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
    {
      return Unauthorized();
    }

    var user = await _context.Users.FindAsync(int.Parse(userId));
    if (!user.IsAdmin)
    {
      return Forbid("You do not have permission to upload files.");
    }

    if (file == null || file.Length == 0)
    {
      return BadRequest("No file uploaded");
    }

    var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
    if (!_allowedExtensions.Contains(extension))
    {
      return BadRequest("Invalid file type. Only .jpg, .jpeg, .png, and .gif files are allowed.");
    }

    if (file.Length > _fileSizeLimit)
    {
      return BadRequest("File size exceeds limit (10MB)");
    }

    if (!file.ContentType.StartsWith("image/"))
    {
      return BadRequest("File must be an image");
    }

    using (var memoryStream = new MemoryStream())
    {
      await file.CopyToAsync(memoryStream);

      // Generate thumbnail
      byte[] thumbnailData;
      using (var image = Image.Load(memoryStream.ToArray()))
      {
        image.Mutate(x => x.Resize(new ResizeOptions
        {
          Size = new Size(600, 600),
          Mode = ResizeMode.Crop
        }));
        using (var thumbnailStream = new MemoryStream())
        {
          image.SaveAsJpeg(thumbnailStream);
          thumbnailData = thumbnailStream.ToArray();
        }
      }

      var picture = new Picture
      {
        FileName = file.FileName,
        ContentType = file.ContentType,
        ImageData = memoryStream.ToArray(),
        ThumbnailData = thumbnailData,
        FileSize = file.Length,
        UploadDate = DateTime.UtcNow,
        Title = string.IsNullOrEmpty(title) ? file.FileName : title,
        Description = description
      };

      _context.Pictures.Add(picture);
      await _context.SaveChangesAsync();
      _loggingService.AddLog("File", $"User {user.Username} uploaded picture '{file.FileName}'");

      return Ok(new
      {
        picture.Id,
        picture.FileName,
        picture.ContentType,
        picture.FileSize,
        picture.UploadDate,
        picture.Title,
        picture.Description,
        ImageUrl = $"/api/protectedgallery/{picture.Id}"
      });
    }
  }


  [HttpGet]
  public async Task<IActionResult> GetPictures()
  {
    var pictures = await _context.Pictures
        .Select(p => new
        {
          p.Id,
          p.FileName,
          p.Title,
          p.Description,
          p.UploadDate,
          p.FileSize,
          ImageUrl = $"/api/protectedgallery/{p.Id}"
        })
        .ToListAsync();

    return Ok(pictures);
  }


  [HttpGet("{id}")]
  public async Task<IActionResult> GetPicture(int id)
  {
    var picture = await _context.Pictures.FindAsync(id);

    if (picture == null)
    {
      return NotFound();
    }

    // Add cache control headers
    Response.Headers.Add("Cache-Control", "public, max-age=3600");
    return File(picture.ImageData, picture.ContentType);
  }

  [HttpGet("thumbnail/{id}")]
  public async Task<IActionResult> GetPictureThumbnail(int id)
  {
    var picture = await _context.Pictures.FindAsync(id);

    if (picture == null)
    {
      return NotFound();
    }

    // Add cache control headers
    Response.Headers.Add("Cache-Control", "public, max-age=3600");
    return File(picture.ThumbnailData, picture.ContentType);
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeletePicture(int id)
  {

    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
    {
      return Unauthorized();
    }

    var user = await _context.Users.FindAsync(int.Parse(userId));
    if (!user.IsAdmin)
    {
      return Forbid("You do not have permission to deelte pictures.");
    }
    var picture = await _context.Pictures.FindAsync(id);

    if (picture == null)
    {
      return NotFound("Picture not found");
    }

    _loggingService.AddLog("File", $"User {user.Username} deleted picture '{picture.FileName}'");
    _context.Pictures.Remove(picture);
    await _context.SaveChangesAsync();
    return Ok("Picture deleted successfully");
  }
}