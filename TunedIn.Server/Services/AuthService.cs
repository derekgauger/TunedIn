using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using LoginSystem.Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TunedIn.Server.Data;

namespace LoginSystem.Backend.Services
{
    public interface IAuthService
    {
        Task<(bool success, string message)> RegisterUser(string username, string email, string password, string firstName, string lastName, string phoneNumber);
        Task<(User user, string message)> AuthenticateUser(string loginIdentifier, string password);
        string GenerateJwtToken(User user);
        Task<(bool success, string message)> ChangePassword(string username, string currentPassword, string newPassword);
        Task<(bool success, string message)> ResetPassword(User username, string newPassword);

    }

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private const int TOKEN_EXPIRY_DAYS = 7;

        public AuthService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<(bool success, string message)> RegisterUser(string username, string email, string password, string firstName, string lastName, string phoneNumber)
        {
            // Check if username already exists
            if (await _context.Users.AnyAsync(u => u.Username == username))
            {
                return (false, "Username already exists");
            }

            // Check if email already exists
            if (await _context.Users.AnyAsync(u => u.Email == email))
            {
                return (false, "Email already exists");
            }

            var salt = GenerateSalt();
            var passwordHash = HashPassword(password, salt);

            var user = new User
            {
                Username = username,
                Email = email,
                PasswordHash = passwordHash,
                Salt = salt,
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber
            };

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return (true, "User registered successfully");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error registering user: {ex.Message}");
                return (false, "An error occurred while registering the user");
            }
        }

        public async Task<(User user, string message)> AuthenticateUser(string loginIdentifier, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginIdentifier || u.Email == loginIdentifier);

            if (user == null || !VerifyPassword(password, user.Salt, user.PasswordHash))
            {
                return (null, "Incorrect username/email or password!");
            }
            return (user, "Authentication successful");
        }

        public async Task<(bool success, string message)> ChangePassword(string email, string currentPassword, string newPassword)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return (false, "User not found");
            }

            if (!VerifyPassword(currentPassword, user.Salt, user.PasswordHash))
            {
                return (false, "Current password is incorrect");
            }

            // Generate new salt and hash for the new password
            var newSalt = GenerateSalt();
            var newPasswordHash = HashPassword(newPassword, newSalt);

            // Update the user's password
            user.Salt = newSalt;
            user.PasswordHash = newPasswordHash;

            try
            {
                await _context.SaveChangesAsync();
                return (true, "Password changed successfully");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error changing password: {ex.Message}");
                return (false, "An error occurred while changing the password");
            }
        }

        public async Task<(bool success, string message)> ResetPassword(User user, string newPassword)
        {
            // Generate new salt and hash for the new password
            var newSalt = GenerateSalt();
            var newPasswordHash = HashPassword(newPassword, newSalt);

            // Update the user's password
            user.Salt = newSalt;
            user.PasswordHash = newPasswordHash;

            try
            {
                await _context.SaveChangesAsync();
                return (true, "Password reset successfully");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error resetting password: {ex.Message}");
                return (false, "An error occurred while resetting the password");
            }
        }


        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.GivenName, user.FirstName),
                    new Claim(ClaimTypes.Surname, user.LastName),
                    new Claim(ClaimTypes.MobilePhone, user.PhoneNumber)
                }),
                Expires = DateTime.UtcNow.AddDays(TOKEN_EXPIRY_DAYS),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }

        private string HashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var combinedHash = string.Concat(password, salt);
                var byteHash = sha256.ComputeHash(Encoding.UTF8.GetBytes(combinedHash));
                return Convert.ToBase64String(byteHash);
            }
        }

        private bool VerifyPassword(string password, string salt, string storedHash)
        {
            var computedHash = HashPassword(password, salt);
            return computedHash == storedHash;
        }
    }
}