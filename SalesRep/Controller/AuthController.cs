using Microsoft.AspNetCore.Mvc;
using SalesRep.Data;
using SalesRep.Services;
using Microsoft.Extensions.Logging;

namespace SalesRep.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthRepository authRepo, ILogger<AuthController> logger)
        {
            _authRepo = authRepo;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDto dto)
        {
            try
            {
                if (await _authRepo.UserExists(dto.Username))
                {
                    _logger.LogWarning("Registration failed: Username {Username} already exists", dto.Username);
                    return BadRequest("Username already exists.");
                }

                await _authRepo.RegisterAsync(dto);
                _logger.LogInformation("User {Username} registered successfully", dto.Username);
                return Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Registration error for user: {Username}", dto.Username);
                return StatusCode(500, "Registration failed due to server error.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto dto)
        {
            try
            {
                var token = await _authRepo.ValidateUserAsync(dto);
                if (token == null)
                {
                    _logger.LogWarning("Login failed: Invalid credentials for user {Username}", dto.Username);
                    return Unauthorized("Invalid credentials.");
                }

                _logger.LogInformation("User {Username} logged in successfully", dto.Username);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Login error for user: {Username}", dto.Username);
                return StatusCode(500, "Login failed due to server error.");
            }
        }
    }
}
