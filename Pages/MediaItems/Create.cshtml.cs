using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using MediaApp.Data;
using MediaApp.Models;
using MediaApp.DTOs;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace MediaApp.Pages.MediaItems
{
    public class CreateModel : PageModel
    {
        private readonly MediaApp.Services.IMediaItemService _service;

        public CreateModel(MediaApp.Services.IMediaItemService service)
        {
            _service = service;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public MediaItemCreateDto MediaItem { get; set; } = default!;

        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var userId = GetUserId();

            await _service.CreateAsync(MediaItem, userId);

            return RedirectToPage("./Index");
        }

        private string GetUserId()
        {
            return User?.Identity?.Name ?? "default-user";
        }
    }
}
