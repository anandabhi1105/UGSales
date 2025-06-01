using Microsoft.AspNetCore.Mvc;
using SalesRep.Data;
using SalesRep.Services;

namespace SalesRep.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesRepsController : ControllerBase
    {
        private readonly ISalesRepService _service;

        public SalesRepsController(ISalesRepService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reps = await _service.GetAllAsync();
            return Ok(reps);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var rep = await _service.GetByIdAsync(id);
            if (rep == null) return NotFound();
            return Ok(rep);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSalesRepDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.SalesRepId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSalesRepDto dto)
        {
            var success = await _service.UpdateAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpGet("/api/sales")]
        public async Task<IActionResult> GetSales([FromQuery] string? product, [FromQuery] string? region, [FromQuery] string? platform)
        {
            var sales = await _service.GetSalesAsync(product, region, platform);
            return Ok(sales);
        }
    }
}