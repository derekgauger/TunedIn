using LoginSystem.Backend.Models;
using TunedIn.Server.Data;

namespace TunedIn.Server.Services
{
  public interface ILoggingService
  {
    Log AddLog(string type, string message);
    List<Log> GetAllLogs();
    List<Log> GetRecentLogs(int count);
    bool DeleteLog(int id);
    List<Log> GetLogsByDateRange(DateTime startDate, DateTime endDate);
  }

  public class LoggingService : ILoggingService
  {
    private readonly ApplicationDbContext _context;

    public LoggingService(ApplicationDbContext context)
    {
      _context = context;
    }

    public Log AddLog(string type, string message)
    {
      var log = new Log
      {
        Type = type,
        Message = message,
        CreatedAt = DateTime.UtcNow
      };

      _context.Logs.Add(log);
      _context.SaveChanges();
      return log;
    }

    public List<Log> GetAllLogs()
    {
      return _context.Logs
        .OrderByDescending(l => l.CreatedAt)
        .ToList();
    }

    public List<Log> GetRecentLogs(int count)
    {
      return _context.Logs
        .OrderByDescending(l => l.CreatedAt)
        .Take(count)
        .ToList();
    }

    public bool DeleteLog(int id)
    {
      var log = _context.Logs.Find(id);
      if (log == null)
        return false;

      _context.Logs.Remove(log);
      _context.SaveChanges();
      return true;
    }

    public List<Log> GetLogsByDateRange(DateTime startDate, DateTime endDate)
    {
      return _context.Logs
        .Where(l => l.CreatedAt >= startDate && l.CreatedAt <= endDate)
        .OrderByDescending(l => l.CreatedAt)
        .ToList();
    }
  }
}