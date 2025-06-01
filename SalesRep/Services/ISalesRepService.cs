using SalesRep.Data;

namespace SalesRep.Services
{
    public interface ISalesRepService
    {
        Task<IEnumerable<SalesRepDto>> GetAllAsync();
        Task<SalesRepDto> GetByIdAsync(int id);
        Task<SalesRepDto> CreateAsync(CreateSalesRepDto dto);
        Task<bool> UpdateAsync(int id, UpdateSalesRepDto dto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<SalesDto>> GetSalesAsync(string? product, string? region, string? platform);
    }
}