using System.Security.Claims;
using LoginSystem.Backend.Models;
using LoginSystem.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TunedIn.Server.Data;
using TunedIn.Server.Services;

namespace LoginSystem.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;
        private readonly ILoggingService _loggingService;

        public AuthController(ApplicationDbContext context, IAuthService authService, IConfiguration configuration, EmailService emailService, ILoggingService loggingService)
        {
            _context = context;
            _authService = authService;
            _configuration = configuration;
            _emailService = emailService;
            _loggingService = loggingService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var (success, message) = await _authService.RegisterUser(model.Username, model.Email, model.Password, model.FirstName, model.LastName, model.PhoneNumber);

            if (success)
            {
                _emailService.SendTemplatedEmail("welcome", model.Email, new Dictionary<string, string>
                {
                    ["Username"] = model.Username,
                });
                _loggingService.AddLog("Login", $"User '{model.Username}' registered an account using email '{model.Email}'");
                return Ok(new { message });
            }
            return BadRequest(new { message });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var (user, message) = await _authService.AuthenticateUser(model.LoginIdentifier, model.Password);

            if (user == null)
            {
                return Unauthorized(new { message });
            }

            var token = _authService.GenerateJwtToken(user);
            _loggingService.AddLog("Login", $"User '{user.Username}' logged in");
            return Ok(new { token, message });
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Verify that the authenticated user matches the username in the request
            var currentUser = User.FindFirst(ClaimTypes.Email)?.Value;
            if (currentUser != model.Email)
            {
                return Unauthorized(new { message = "You can only change your own password" });
            }

            var (success, message) = await _authService.ChangePassword(
                model.Email,
                model.CurrentPassword,
                model.NewPassword
            );

            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (success && username != null)
            {
                _loggingService.AddLog("Security", $"User '{username}' changed their password");
                _emailService.SendTemplatedEmail("passwordChanged", model.Email,
                    new Dictionary<string, string>
                    {
                        ["Username"] = username,
                    });
                return Ok(new { message });
            }

            return BadRequest(new { message });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model.NewPassword != model.ConfirmNewPassword)
            {
                return BadRequest(new { message = "Passwords do not match" });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var (success, message) = await _authService.ResetPassword(user, model.NewPassword);

            if (success)
            {
                _loggingService.AddLog("Security", $"User '{user.Username}' reset their password");
                _emailService.SendTemplatedEmail("passwordReset", model.Email, new Dictionary<string, string>
                {
                    ["Username"] = user.Username,
                });
                return Ok(new { message });
            }

            return BadRequest(new { message });
        }

        [HttpPut("set-email-verification-code")]
        public async Task<IActionResult> SetEmailVerificationCode([FromQuery] string Email)
        {
            if (string.IsNullOrEmpty(Email))
            {
                return BadRequest("Email is required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == Email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var random = new Random();
            user.EmailVerificationCode = random.Next(10000000, 99999999);

            try
            {
                await _context.SaveChangesAsync();
                _emailService.SendTemplatedEmail("emailVerificationCode", Email, new Dictionary<string, string>
                {
                    ["VerificationCode"] = user.EmailVerificationCode.ToString()
                });
                return Ok("Email verification code set successfully.");
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while setting the email verification code.");
            }
        }

        [HttpPut("verify-email-code")]
        public async Task<IActionResult> VerifyEmailCode([FromQuery] string Email, [FromQuery] int VerificationCode)
        {
            if (string.IsNullOrEmpty(Email))
            {
                return BadRequest("Email is required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == Email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (user.EmailVerificationCode == VerificationCode)
            {
                user.VerifiedEmail = true;
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok("Email verified successfully.");
                }
                catch (DbUpdateException)
                {
                    return StatusCode(500, "An error occurred while verifying the email.");
                }
            }
            else
            {
                return BadRequest("Invalid verification code.");
            }
        }
    }
}