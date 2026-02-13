using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using MediaApp.Data;
using MediaApp.Models;

namespace MediaApp.Pages.MediaItems
{
    public class CreateModel : PageModel
    {
        private readonly MediaApp.Data.MediaItemDbContext _context;

        public CreateModel(MediaApp.Data.MediaItemDbContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public MediaItem MediaItem { get; set; } = default!;

        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.MediaItems.Add(MediaItem);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
