using LoginSystem.Backend.Models;
using LoginSystem.Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace LoginSystem.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _configuration = configuration;
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
            return Ok(new { token, message });
        }
    }
}