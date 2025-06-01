using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using SalesRep.Data;
using SalesRep.Services;

namespace SalesRep.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;

        public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDto dto)
        {
            if (await _authRepo.UserExists(dto.Username))
                return BadRequest("Username already exists.");

            await _authRepo.RegisterAsync(dto);
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto dto)
        {
            var isValid = await _authRepo.ValidateUserAsync(dto);
            if (!isValid)
                return Unauthorized("Invalid username or password.");

            return Ok("Login successful.");
        }
    }
}
