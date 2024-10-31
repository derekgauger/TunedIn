using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TunedIn.Server.Data;

[ApiController]
[Route("api/[controller]")]
public class FormController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public FormController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet("get-forms")]
  public async Task<IActionResult> GetAllForms()
  {
    var forms = await _context.Forms
        .Select(f => new
        {
          f.Id,
          f.FileName,
          f.ContentType,
          f.FileSize,
          f.UploadDate,
        })
        .ToListAsync();

    return Ok(forms);
  }

  [HttpGet("download/{id}")]
  public async Task<IActionResult> DownloadFile(int id)
  {
    var file = await _context.Forms.FindAsync(id);

    if (file == null)
    {
      return NotFound("File not found");
    }

    return File(file.FileContent, file.ContentType, file.FileName);
  }
}


