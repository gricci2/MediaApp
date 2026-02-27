using System.ComponentModel.DataAnnotations;
using MediaApp.Models;

namespace MediaApp.DTOs
{
    public class MediaItemCreateDto
    {
        [Required]
        [StringLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public MediaType Type { get; set; }

        public bool IsCompleted { get; set; } = false;

        public string Information { get; set; } = "N/A";
    }
}
