using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MediaApp.Data;
using MediaApp.Models;

namespace MediaApp.Pages.MediaItems
{
    public class EditModel : PageModel
    {
        private readonly MediaApp.Services.IMediaItemService _service;

        public EditModel(MediaApp.Services.IMediaItemService service)
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

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var userId = GetUserId();

            bool updated = await _service.UpdateAsync(MediaItem);

            if(!updated)
            {
                return NotFound();
            }

            return RedirectToPage("./Index");
        }

        private string GetUserId()
        {
            return User?.Identity?.Name ?? "default-user";
        }
    }
}
