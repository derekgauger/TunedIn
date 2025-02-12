using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TunedIn.Server.Data;
using TunedIn.Server.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProtectedFormController : ControllerBase
{
  private readonly ApplicationDbContext _context;
  private readonly long _fileSizeLimit = 10 * 1024 * 1024; // 10MB limit
  private readonly ILoggingService _loggingService;

  public ProtectedFormController(ApplicationDbContext context, ILoggingService loggingService)
  {
    _context = context;
    _loggingService = loggingService;
  }

  [HttpPost("upload")]
  public async Task<IActionResult> UploadFile(IFormFile file)
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

    if (file.Length > _fileSizeLimit)
    {
      return BadRequest("File size exceeds limit (10MB)");
    }

    using (var memoryStream = new MemoryStream())
    {
      await file.CopyToAsync(memoryStream);

      var fileModel = new FormModel
      {
        FileName = file.FileName,
        ContentType = file.ContentType,
        FileContent = memoryStream.ToArray(),
        FileSize = file.Length,
        UploadDate = DateTime.UtcNow,
      };

      _context.Forms.Add(fileModel);
      await _context.SaveChangesAsync();


      _loggingService.AddLog("File", $"User {user.Username} uploaded file '{file.FileName}'");
      return Ok(new
      {
        fileModel.Id,
        fileModel.FileName,
        fileModel.ContentType,
        fileModel.FileSize,
        fileModel.UploadDate
      });
    }
  }

  [HttpDelete("delete/{id}")]
  public async Task<IActionResult> DeleteFile(int id)
  {
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId))
    {
      return Unauthorized();
    }

    var user = await _context.Users.FindAsync(int.Parse(userId));
    if (!user.IsAdmin)
    {
      return Forbid("You do not have permission to delete files.");
    }

    var file = await _context.Forms.FindAsync(id);

    if (file == null)
    {
      return NotFound("File not found");
    }

    if (!user.IsAdmin)
    {
      return Forbid("You do not have permission to delete this file.");
    }

    _loggingService.AddLog("File", $"User {user.Username} deleted file '{file.FileName}'");
    _context.Forms.Remove(file);
    await _context.SaveChangesAsync();
    return Ok("File deleted successfully");
  }
}
