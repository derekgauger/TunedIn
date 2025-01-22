using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TunedIn.Server.Data;
using TunedIn.Server.Services;
using System.Threading.Tasks;
using LoginSystem.Backend.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProtectedLogController : ControllerBase
{
  private readonly ApplicationDbContext _context;
  private readonly ILoggingService _loggingService;

  public ProtectedLogController(ApplicationDbContext context, ILoggingService loggingService)
  {
    _context = context;
    _loggingService = loggingService;
  }

  private async Task<bool> IsUserAdmin()
  {
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var user = await _context.Users.FindAsync(int.Parse(userId));
    return user?.IsAdmin ?? false;
  }

  // Get all logs - admin only
  [HttpGet("get-logs")]
  public async Task<IActionResult> GetLogs()
  {
    if (!await IsUserAdmin())
      return Forbid();

    var logs = await _context.Logs
        .OrderByDescending(l => l.CreatedAt)
        .ToListAsync();
    return Ok(logs);
  }

  // Get single log by id - admin only
  [HttpGet("{id}")]
  public async Task<IActionResult> GetLog(int id)
  {
    if (!await IsUserAdmin())
      return Forbid();

    var log = await _context.Logs.FindAsync(id);

    if (log == null)
      return NotFound();

    return Ok(log);
  }

  // Search logs by type or message - admin only
  [HttpGet("search")]
  public async Task<IActionResult> SearchLogs([FromQuery] string searchTerm)
  {
    if (!await IsUserAdmin())
      return Forbid();

    var logs = await _context.Logs
        .Where(l => l.Message.Contains(searchTerm) ||
                   l.Type.Contains(searchTerm))
        .OrderByDescending(l => l.CreatedAt)
        .ToListAsync();

    return Ok(logs);
  }

  // Update log - admin only
  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateLog(int id, Log updatedLog)
  {
    if (!await IsUserAdmin())
      return Forbid();

    var log = await _context.Logs.FindAsync(id);

    if (log == null)
      return NotFound();

    log.Message = updatedLog.Message;
    log.Type = updatedLog.Type;

    await _context.SaveChangesAsync();
    return NoContent();
  }

  // Delete log - admin only
  [HttpDelete("delete/{id}")]
  public async Task<IActionResult> DeleteLog(int id)
  {
    if (!await IsUserAdmin())
      return Forbid();

    var log = await _context.Logs.FindAsync(id);

    if (log == null)
      return NotFound();

    _context.Logs.Remove(log);
    await _context.SaveChangesAsync();
    return NoContent();
  }
}