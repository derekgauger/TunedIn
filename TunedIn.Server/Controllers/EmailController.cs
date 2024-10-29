using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace YourNamespace.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize] // This attribute ensures that all endpoints in this controller require authorization
  public class EmailController : ControllerBase
  {
    private readonly EmailService _emailService;

    public EmailController(EmailService emailService)
    {
      _emailService = emailService;
    }

    [HttpPost("send-email")]
    public IActionResult SendEmail([FromBody] EmailModel model)
    {
      var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
      if (string.IsNullOrEmpty(userEmail))
      {
        return BadRequest("User email not found in the token");
      }
      _emailService.SendEmail(userEmail, model.Subject, model.Body, model.Email, model.Name);
      return Ok("Email sent successfully");
    }
  }
}