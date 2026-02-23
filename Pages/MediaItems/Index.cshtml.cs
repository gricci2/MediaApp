using MediaApp.Data;
using MediaApp.Models;
using MediaApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        [BindProperty(SupportsGet = true)]
        public string? SearchString { get; set; }

        public SelectList? Types { get; set; }

        [BindProperty(SupportsGet = true)]
        public MediaType? MediaType { get; set; }

        public async Task OnGetAsync()
        {
            //IQueryable<MediaType> typeQuery = from m in _context.MediaItems
            //                               orderby m.Type
            //                               select m.Type;

            var mediaitems = from m in _context.MediaItems
                         select m;
            if (!string.IsNullOrEmpty(SearchString))
            {
                mediaitems = mediaitems.Where(s => s.Title.Contains(SearchString));
            }

            if (MediaType.HasValue)
            {
                mediaitems = mediaitems.Where(x => x.Type == MediaType.Value);
            }

            //Types = new SelectList(await typeQuery.Distinct().ToListAsync());
            Types = new SelectList(Enum.GetValues<MediaType>());

            MediaItem = await mediaitems.ToListAsync();
        }
    }
}
