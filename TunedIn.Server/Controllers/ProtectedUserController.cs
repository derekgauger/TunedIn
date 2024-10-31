using LoginSystem.Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TunedIn.Server.Data;

namespace LoginSystem.Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProtectedUserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProtectedUserController(ApplicationDbContext context)
        {
            _context = context;
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
        public async Task<IActionResult> GetUserByEmail([FromQuery] string Username)
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
                user.VerifiedPhone
            };

            return Ok(userInfo);
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
                user.VerifiedPhone
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
                await _context.SaveChangesAsync();
                return Ok("User account deleted successfully.");
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "An error occurred while deleting the user account.");
            }
        }
    }
}