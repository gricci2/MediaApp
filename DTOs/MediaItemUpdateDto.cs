using System.ComponentModel.DataAnnotations;
using MediaApp.Models;

namespace MediaApp.DTOs
{
    public class MediaItemUpdateDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Title { get; set; }

        [Required]
        public MediaType Type { get; set; }

        public bool IsCompleted { get; set; }

        public string Information { get; set; }
    }
}
