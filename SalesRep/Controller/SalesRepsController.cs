using Microsoft.AspNetCore.Mvc;
using SalesRep.Data;
using SalesRep.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace SalesRep.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesRepsController : ControllerBase
    {
        private readonly ISalesRepService _service;
        private readonly ILogger<SalesRepsController> _logger;

        public SalesRepsController(ISalesRepService service, ILogger<SalesRepsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var reps = await _service.GetAllAsync();
                return Ok(reps);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all sales reps");
                return StatusCode(500, "An error occurred while retrieving sales reps.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var rep = await _service.GetByIdAsync(id);
                if (rep == null)
                {
                    return NotFound();
                }

                return Ok(rep);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching sales rep with ID: {Id}", id);
                return StatusCode(500, "An error occurred while retrieving the sales rep.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSalesRepDto dto)
        {
            try
            {
                var created = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(Get), new { id = created.SalesRepId }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating sales rep");
                return StatusCode(500, "An error occurred while creating the sales rep.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSalesRepDto dto)
        {
            try
            {
                var success = await _service.UpdateAsync(id, dto);
                if (!success)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating sales rep with ID: {Id}", id);
                return StatusCode(500, "An error occurred while updating the sales rep.");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var success = await _service.DeleteAsync(id);
                if (!success)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting sales rep with ID: {Id}", id);
                return StatusCode(500, "An error occurred while deleting the sales rep.");
            }
        }

        [HttpGet("/api/sales")]
        public async Task<IActionResult> GetSales([FromQuery] string? product, [FromQuery] string? region, [FromQuery] string? platform)
        {
            try
            {
                var sales = await _service.GetSalesAsync(product, region, platform);
                return Ok(sales);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching sales data");
                return StatusCode(500, "An error occurred while retrieving sales data.");
            }
        }
    }
}
