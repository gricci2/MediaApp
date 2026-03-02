using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using MediaApp.Services;
using MediaApp.DTOs;



namespace MediaApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    
    public class MediaItemsController : ControllerBase
    {
        private readonly IMediaItemService _service;

        public MediaItemsController(IMediaItemService service)
        {
            _service = service;
        }
        private string GetUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MediaItemReadDto>>> GetAll()
        {
            var userId = GetUserId();
            var items = await _service.GetAllAsync(userId);

            //if(items == null)
            //{
            //    return NotFound();
            //}

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MediaItemReadDto>> GetById(int id)
        {
            var userId = GetUserId();
            var item = await _service.GetByIdAsync(id, userId);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult> Create(MediaItemCreateDto dto)
        {
            var userId = GetUserId();
            await _service.CreateAsync(dto, userId);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, MediaItemUpdateDto dto)
        {
            if(id != dto.Id)
            {
                return BadRequest();
            }

            var userId = GetUserId();
            var updated = await _service.UpdateAsync(dto, userId);

            if(!updated)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = GetUserId();
            var deleted = await _service.DeleteAsync(id, userId);
            if(!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
