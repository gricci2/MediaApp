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
using MediaApp.DTOs;

namespace MediaApp.Pages.MediaItems
{
    public class IndexModel : PageModel
    {
        private readonly MediaApp.Services.IMediaItemService _service;

        public IndexModel(MediaApp.Services.IMediaItemService service)
        {
            _service = service;
        }

        public IList<MediaItemReadDto> MediaItem { get;set; } = new List<MediaItemReadDto>();

        [BindProperty(SupportsGet = true)]
        public string? SearchString { get; set; }

        public SelectList? Types { get; set; }

        [BindProperty(SupportsGet = true)]
        public MediaType? MediaType { get; set; }

        public async Task OnGetAsync()
        {
            var userId = GetUserId();

            var mediaItems = await _service.GetAllAsync(userId);

            var filtered = mediaItems.AsEnumerable();

            if (!string.IsNullOrEmpty(SearchString))
            {
                filtered = filtered.Where(s => s.Title.Contains(SearchString, StringComparison.OrdinalIgnoreCase));
            }

            if (MediaType.HasValue)
            {
                filtered = filtered.Where(x => x.Type == MediaType.Value.ToString());
            }

            //Types = new SelectList(await typeQuery.Distinct().ToListAsync());
            Types = new SelectList(Enum.GetValues<MediaType>());

            MediaItem = filtered.ToList();
        }

        private string GetUserId()
        {
            return User?.Identity?.Name ?? "default-user";
        }
    }
}
