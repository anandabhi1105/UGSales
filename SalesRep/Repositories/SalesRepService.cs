using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SalesRep.Data;
using SalesRep.Models;
using SalesRep.Services;

namespace SalesRep.Repositories
{
    public class SalesRepService : ISalesRepService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public SalesRepService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SalesRepDto>> GetAllAsync()
        {
            var reps = await _context.SalesRepresentatives.ToListAsync();
            return _mapper.Map<IEnumerable<SalesRepDto>>(reps);
        }

        public async Task<SalesRepDto> GetByIdAsync(int id)
        {
            var rep = await _context.SalesRepresentatives.FindAsync(id);
            return rep == null ? null : _mapper.Map<SalesRepDto>(rep);
        }

        public async Task<SalesRepDto> CreateAsync(CreateSalesRepDto dto)
        {
            var rep = _mapper.Map<SalesRepresentative>(dto);
            _context.SalesRepresentatives.Add(rep);
            await _context.SaveChangesAsync();
            return _mapper.Map<SalesRepDto>(rep);
        }

        public async Task<bool> UpdateAsync(int id, UpdateSalesRepDto dto)
        {
            var rep = await _context.SalesRepresentatives.FindAsync(id);
            if (rep == null) return false;
            _mapper.Map(dto, rep);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var rep = await _context.SalesRepresentatives.FindAsync(id);
            if (rep == null) return false;
            _context.SalesRepresentatives.Remove(rep);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<SalesDto>> GetSalesAsync(string? product, string? region, string? platform)
        {
            var query = _context.ProductSales.Include(s => s.SalesRepresentative).AsQueryable();

            if (!string.IsNullOrEmpty(product))
                query = query.Where(s => s.Product.Contains(product));
            if (!string.IsNullOrEmpty(region))
                query = query.Where(s => s.SalesRepresentative.Region == region);
            if (!string.IsNullOrEmpty(platform))
                query = query.Where(s => s.SalesRepresentative.Platform == platform);

            var sales = await query.ToListAsync();
            return _mapper.Map<IEnumerable<SalesDto>>(sales);
        }
    }
}