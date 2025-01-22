using System.ComponentModel.DataAnnotations;

namespace LoginSystem.Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Salt { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Goal { get; set; } = "I want to get fit!";
        public string Membership { get; set; } = "None";
        public Boolean IsAdmin { get; set; } = false;
        public Boolean VerifiedEmail { get; set; } = false;
        public Boolean VerifiedPhone { get; set; } = false;
        public DateTime LatestChangeMembershipRequest { get; set; } = DateTime.MinValue;
        public int EmailVerificationCode { get; set; }
    }

    public class RegisterModel
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }

    public class LoginModel
    {
        public string LoginIdentifier { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class UpdateUserRequest
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Goal { get; set; } = string.Empty;
        public string Membership { get; set; } = string.Empty;
    }

    public class ChangePasswordRequest
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword", ErrorMessage = "The confirmation password does not match")]
        public string ConfirmNewPassword { get; set; }

        [Required]
        public string Email { get; set; }
    }

    public class ForgotPasswordRequest
    {
        [Required]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword", ErrorMessage = "The confirmation password does not match")]
        public string ConfirmNewPassword { get; set; }

        [Required]
        public string Email { get; set; }
    }
}