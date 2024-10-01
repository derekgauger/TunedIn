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
    public class ProtectedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProtectedController(ApplicationDbContext context)
        {
            _context = context;
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

            var user = await _context.Users.FindAsync(userIdInt);
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
                user.Membership
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

            if (userIdInt != updatedUser.Id)
            {
                return Forbid();
            }

            var user = await _context.Users.FindAsync(userIdInt);
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
        public async Task<IActionResult> DeleteAccount()
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

            var user = await _context.Users.FindAsync(userIdInt);
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

        [HttpGet("protected-resource")]
        public async Task<IActionResult> GetProtectedResource()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Here you can use the user object to fetch user-specific data or perform user-specific actions
            // For example:
            // var userSpecificData = await _context.UserData.Where(d => d.UserId == userId).ToListAsync();

            return Ok($"Access granted to protected resource for user: {user.Username}");
        }
    }
}