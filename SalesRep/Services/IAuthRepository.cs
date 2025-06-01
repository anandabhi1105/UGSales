using System.Threading.Tasks;
using SalesRep.Data;

namespace SalesRep.Services
{
    public interface IAuthRepository
    {
        Task<bool> UserExists(string username);
        Task RegisterAsync(RegisterUserDto dto);
        Task<bool> ValidateUserAsync(LoginUserDto dto);
    }
}
