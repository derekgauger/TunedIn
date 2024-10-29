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
        // public bool EmailNotifications { get; set; } = true;
        // public bool SMSNotifications { get; set; } = true;
        // public bool ServiceUpdateNotifications { get; set; } = true;
        // public bool NewsLetterNotifications { get; set; } = true;
        // public bool MarketingNotifications { get; set; } = true;
        // public bool SecurityAlertNotifications { get; set; } = true;
    }
}