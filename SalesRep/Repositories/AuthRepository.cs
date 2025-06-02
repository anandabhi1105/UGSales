using Microsoft.EntityFrameworkCore;
using SalesRep.Data;
using SalesRep.Models;
using SalesRep.Services;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace SalesRep.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly JwtService _jwt;
        private readonly ILogger<AuthRepository> _logger;

        public AuthRepository(AppDbContext context, IMapper mapper, JwtService jwt, ILogger<AuthRepository> logger)
        {
            _context = context;
            _mapper = mapper;
            _jwt = jwt;
            _logger = logger;
        }

        public async Task<bool> UserExists(string username)
        {
            try
            {
                return await _context.Users.AnyAsync(u => u.Username == username);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking if user exists: {Username}", username);
                throw;
            }
        }

        public async Task RegisterAsync(RegisterUserDto dto)
        {
            try
            {
                var user = _mapper.Map<Users>(dto);
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error registering user: {Username}", dto.Username);
                throw;
            }
        }

        public async Task<string?> ValidateUserAsync(LoginUserDto dto)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == dto.Username);
                if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                    return null;

                return _jwt.GenerateToken(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error validating user: {Username}", dto.Username);
                throw;
            }
        }
    }
}
