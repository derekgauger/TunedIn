using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace TunedIn.Server.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class EmailController : ControllerBase
  {
    private readonly EmailService _emailService;

    public EmailController(EmailService emailService)
    {
      _emailService = emailService;
    }

    [HttpPost("send-templated-email")]
    public IActionResult SendTemplatedEmail([FromBody] TemplatedEmailModel model)
    {
      if (string.IsNullOrEmpty(model.ToEmail))
      {
        return BadRequest("Recipient email is required");
      }

      _emailService.SendTemplatedEmail(model.TemplateName, model.ToEmail, model.Parameters);
      return Ok("Email sent successfully");
    }
  }

  public class TemplatedEmailModel
  {
    public string TemplateName { get; set; }
    public string ToEmail { get; set; }
    public Dictionary<string, string> Parameters { get; set; }
  }
}
