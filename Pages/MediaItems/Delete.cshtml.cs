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
        private readonly MediaApp.Data.MediaItemDbContext _context;

        public DeleteModel(MediaApp.Data.MediaItemDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public MediaItem MediaItem { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mediaitem = await _context.MediaItems.FirstOrDefaultAsync(m => m.Id == id);

            if (mediaitem == null)
            {
                return NotFound();
            }
            else
            {
                MediaItem = mediaitem;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mediaitem = await _context.MediaItems.FindAsync(id);
            if (mediaitem != null)
            {
                MediaItem = mediaitem;
                _context.MediaItems.Remove(MediaItem);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
