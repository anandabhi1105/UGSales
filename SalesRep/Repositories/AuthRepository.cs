using Microsoft.EntityFrameworkCore;
using SalesRep.Data;
using SalesRep.Models;
using SalesRep.Services;
using AutoMapper;

namespace SalesRep.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public AuthRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        public async Task RegisterAsync(RegisterUserDto dto)
        {
            var user = _mapper.Map<Users>(dto);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ValidateUserAsync(LoginUserDto dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == dto.Username);
            return user != null && BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
        }
    }
}
