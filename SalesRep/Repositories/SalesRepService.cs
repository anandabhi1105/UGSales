using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SalesRep.Data;
using SalesRep.Models;
using SalesRep.Services;

namespace SalesRep.Repositories
{
    public class SalesRepService : ISalesRepService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<SalesRepService> _logger;

        public SalesRepService(AppDbContext context, IMapper mapper, ILogger<SalesRepService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<IEnumerable<SalesRepDto>> GetAllAsync()
        {
            try
            {
                var reps = await _context.SalesRepresentatives.ToListAsync();
                return _mapper.Map<IEnumerable<SalesRepDto>>(reps);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all sales representatives");
                throw;
            }
        }

        public async Task<SalesRepDto> GetByIdAsync(int id)
        {
            try
            {
                var rep = await _context.SalesRepresentatives.FindAsync(id);
                return rep == null ? null : _mapper.Map<SalesRepDto>(rep);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching sales representative with ID {Id}", id);
                throw;
            }
        }

        public async Task<SalesRepDto> CreateAsync(CreateSalesRepDto dto)
        {
            try
            {
                var rep = _mapper.Map<SalesRepresentative>(dto);
                _context.SalesRepresentatives.Add(rep);
                await _context.SaveChangesAsync();
                return _mapper.Map<SalesRepDto>(rep);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating sales representative");
                throw;
            }
        }

        public async Task<bool> UpdateAsync(int id, UpdateSalesRepDto dto)
        {
            try
            {
                var rep = await _context.SalesRepresentatives.FindAsync(id);
                if (rep == null) return false;

                _mapper.Map(dto, rep);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating sales representative with ID {Id}", id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var rep = await _context.SalesRepresentatives.FindAsync(id);
                if (rep == null) return false;

                _context.SalesRepresentatives.Remove(rep);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting sales representative with ID {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<SalesDto>> GetSalesAsync(string? product, string? region, string? platform)
        {
            try
            {
                var query = _context.ProductSales
                    .Include(s => s.SalesRepresentative)
                    .AsQueryable();

                if (!string.IsNullOrEmpty(product))
                    query = query.Where(s => s.Product.Contains(product));

                if (!string.IsNullOrEmpty(region))
                    query = query.Where(s => s.SalesRepresentative.Region == region);

                if (!string.IsNullOrEmpty(platform))
                    query = query.Where(s => s.SalesRepresentative.Platform == platform);

                var sales = await query.ToListAsync();
                return _mapper.Map<IEnumerable<SalesDto>>(sales);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching filtered sales data");
                throw;
            }
        }
    }
}
