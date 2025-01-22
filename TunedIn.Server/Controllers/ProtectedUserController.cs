using LoginSystem.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TunedIn.Server.Data;
using TunedIn.Server.Services;

namespace LoginSystem.Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ProtectedUserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILoggingService _loggingService;
        private readonly EmailService _emailService;

        public ProtectedUserController(ApplicationDbContext context, ILoggingService loggingService, EmailService emailService)
        {
            _context = context;
            _loggingService = loggingService;
            _emailService = emailService;
        }

        [HttpGet("all-users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var requestingUser = await _context.Users.FindAsync(int.Parse(userId));
            if (requestingUser == null || !requestingUser.IsAdmin)
            {
                return Forbid("You do not have permission to access this resource.");
            }

            var users = await _context.Users.Select(user => new
            {
                user.Id,
                user.Username,
                user.Email,
                user.FirstName,
                user.LastName,
                user.PhoneNumber,
                user.Goal,
                user.CreatedAt,
                user.Membership,
                user.IsAdmin
            }).ToListAsync();

            return Ok(users);
        }

        [HttpGet("user-by-username")]
        public async Task<IActionResult> GetUserByUsername([FromQuery] string Username)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var requestingUser = await _context.Users.FindAsync(int.Parse(userId));
            if (requestingUser == null || !requestingUser.IsAdmin)
            {
                return Forbid("You do not have permission to access this resource.");
            }

            if (string.IsNullOrEmpty(Username))
            {
                return BadRequest("Username is required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == Username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var userInfo = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.FirstName,
                user.LastName,
                user.PhoneNumber,
                user.Goal,
                user.CreatedAt,
                user.Membership,
                user.IsAdmin,
                user.VerifiedEmail,
                user.VerifiedPhone,
                user.LatestChangeMembershipRequest
            };

            return Ok(userInfo);
        }

        [HttpGet("user-by-email")]
        public async Task<IActionResult> GetUserByEmail([FromQuery] string Email)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var requestingUser = await _context.Users.FindAsync(int.Parse(userId));
            if (requestingUser == null || !requestingUser.IsAdmin)
            {
                return Forbid("You do not have permission to access this resource.");
            }

            if (string.IsNullOrEmpty(Email))
            {
                return BadRequest("Email is required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == Email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var userInfo = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.FirstName,
                user.LastName,
                user.PhoneNumber,
                user.Goal,
                user.CreatedAt,
                user.Membership,
                user.IsAdmin,
                user.VerifiedEmail,
                user.VerifiedPhone,
                user.LatestChangeMembershipRequest
            };

            return Ok(userInfo);
        }


        [HttpPut("update-membership-request")]
        public async Task<IActionResult> UpdateMembershipRequest([FromQuery] string Username)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var requestingUser = await _context.Users.FindAsync(int.Parse(userId));
            if (requestingUser == null || !requestingUser.IsAdmin)
            {
                return Forbid("You do not have permission to access this resource.");
            }

            if (string.IsNullOrEmpty(Username))
            {
                return BadRequest("Username is required.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == Username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            user.LatestChangeMembershipRequest = DateTime.Now;
            try
            {
                await _context.SaveChangesAsync();
                return Ok("Membership request updated successfully.");
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while updating the membership request.");
            }
        }

        [HttpGet("user-info")]
        public async Task<IActionResult> GetUserInfo()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (!int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("Invalid user ID format.");
            }

            var requestingUser = await _context.Users.FindAsync(userIdInt);
            if (requestingUser == null)
            {
                return NotFound("Requesting user not found");
            }

            var user = await _context.Users.FindAsync(userIdInt);
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!requestingUser.IsAdmin && requestingUser.Id != user.Id)
            {
                return Forbid("You do not have permission to access this resource.");
            }

            var userInfo = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.FirstName,
                user.LastName,
                user.PhoneNumber,
                user.Goal,
                user.CreatedAt,
                user.Membership,
                user.IsAdmin,
                user.VerifiedEmail,
                user.VerifiedPhone,
                user.LatestChangeMembershipRequest
            };

            return Ok(userInfo);
        }

        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest updatedUser)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (!int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("Invalid user ID format.");
            }

            var requestingUser = await _context.Users.FindAsync(userIdInt);
            if (requestingUser == null)
            {
                return NotFound("Requesting user not found");
            }

            if (!requestingUser.IsAdmin && userIdInt != updatedUser.Id)
            {
                return Forbid("You do not have permission to update this user.");
            }

            var user = await _context.Users.FindAsync(updatedUser.Id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Check if the username is already taken
            var existingUserWithUsername = await _context.Users.FirstOrDefaultAsync(u => u.Username == updatedUser.Username && u.Id != updatedUser.Id);
            if (existingUserWithUsername != null)
            {
                return BadRequest("Username is already taken.");
            }

            // Check if the email is already taken
            var existingUserWithEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == updatedUser.Email && u.Id != updatedUser.Id);
            if (existingUserWithEmail != null)
            {
                return BadRequest("Email is already taken.");
            }

            // Track changes
            var changes = new List<string>();

            if (user.Username != updatedUser.Username)
                changes.Add($"Username changed from '{user.Username}' to '{updatedUser.Username}'");

            if (user.Email != updatedUser.Email)
                changes.Add($"Email changed from '{user.Email}' to '{updatedUser.Email}'");

            if (user.FirstName != updatedUser.FirstName)
                changes.Add($"First name changed from '{user.FirstName}' to '{updatedUser.FirstName}'");

            if (user.LastName != updatedUser.LastName)
                changes.Add($"Last name changed from '{user.LastName}' to '{updatedUser.LastName}'");

            if (user.PhoneNumber != updatedUser.PhoneNumber)
                changes.Add($"Phone number changed from '{user.PhoneNumber}' to '{updatedUser.PhoneNumber}'");

            if (user.Goal != updatedUser.Goal)
                changes.Add($"Goal changed from '{user.Goal}' to '{updatedUser.Goal}'");

            if (user.Membership != updatedUser.Membership)
            {
                changes.Add($"Membership changed from '{user.Membership}' to '{updatedUser.Membership}'");

            }

            // Update user properties
            user.Username = updatedUser.Username;
            user.Email = updatedUser.Email;
            user.FirstName = updatedUser.FirstName;
            user.LastName = updatedUser.LastName;
            user.PhoneNumber = updatedUser.PhoneNumber;
            user.Goal = updatedUser.Goal;
            user.Membership = updatedUser.Membership;

            try
            {
                if (changes.Any())
                {
                    var logMessage = string.Join("\n", new[]
                    {
                $"User '{requestingUser.Username}' updated user '{user.Username}'.",
                "Changes made:",
                string.Join("\n", changes.Select(c => $"- {c}"))
            });

                    _loggingService.AddLog("User", logMessage);
                }
                else
                {
                    _loggingService.AddLog("User", $"User '{requestingUser.Username}' submitted update for user '{user.Username}' with no changes detected.");
                }

                await _context.SaveChangesAsync();
                return Ok("User updated successfully.");
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while updating the user.");
            }
        }

        [HttpDelete("delete-account")]
        public async Task<IActionResult> DeleteAccount([FromQuery] string usernameToDelete)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (!int.TryParse(userId, out int userIdInt))
            {
                return BadRequest("Invalid user ID format.");
            }

            var requestingUser = await _context.Users.FindAsync(userIdInt);
            if (requestingUser == null)
            {
                return NotFound("Requesting user not found");
            }

            if (!requestingUser.IsAdmin && requestingUser.Username != usernameToDelete)
            {
                return Forbid("You do not have permission to delete this user.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == usernameToDelete);
            if (user == null)
            {
                return NotFound("User not found");
            }

            _context.Users.Remove(user);

            try
            {
                _loggingService.AddLog("User", $"User '{requestingUser.Username}' deleted user '{user.Username}'");
                await _context.SaveChangesAsync();
                return Ok("User account deleted successfully.");
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while deleting the user account.");
            }
        }

        [HttpPut("set-email-verification-code")]
        public async Task<IActionResult> SetEmailVerificationCode([FromQuery] string Email)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var requestingUser = await _context.Users.FindAsync(int.Parse(userId));
            if (requestingUser == null || !requestingUser.IsAdmin)
            {
                return Forbid("You do not have permission to access this resource.");
            }

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
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var requestingUser = await _context.Users.FindAsync(int.Parse(userId));
            if (requestingUser == null || !requestingUser.IsAdmin)
            {
                return Forbid("You do not have permission to access this resource.");
            }

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