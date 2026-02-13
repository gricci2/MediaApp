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
    public class DetailsModel : PageModel
    {
        private readonly MediaApp.Data.MediaItemDbContext _context;

        public DetailsModel(MediaApp.Data.MediaItemDbContext context)
        {
            _context = context;
        }

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
    }
}
