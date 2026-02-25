using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MediaApp.Data;
using MediaApp.Models;

namespace MediaApp.Pages.MediaItems
{
    public class DeleteModel : PageModel
    {
        private readonly MediaApp.Services.IMediaItemService _service;

        public DeleteModel(MediaApp.Services.IMediaItemService service)
        {
            _service = service;
        }

        [BindProperty]
        public MediaItem MediaItem { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userId = GetUserId();

            var mediaItem = await _service.GetByIdAsync(id.Value, userId);
            if (mediaItem == null)
            {
                return NotFound();
            }
            else
            {
                MediaItem = mediaItem;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userId = GetUserId();

            await _service.DeleteAsync(id.Value, userId);

            return RedirectToPage("./Index");
        }

        private string GetUserId()
        {
            return User?.Identity?.Name ?? "default-user";
        }
    }
}
