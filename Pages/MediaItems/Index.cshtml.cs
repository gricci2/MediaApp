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
    public class IndexModel : PageModel
    {
        private readonly MediaApp.Data.MediaItemDbContext _context;

        public IndexModel(MediaApp.Data.MediaItemDbContext context)
        {
            _context = context;
        }

        public IList<MediaItem> MediaItem { get;set; } = default!;

        public async Task OnGetAsync()
        {
            MediaItem = await _context.MediaItems.ToListAsync();
        }
    }
}
