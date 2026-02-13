using System.ComponentModel.DataAnnotations;

namespace MediaApp.Models
{
    public enum MediaType
    {
        Book,
        Show,
        Movie,
        Video,
        Podcast
    }
    public class MediaItem
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public MediaType Type { get; set; }

        public bool isCompleted { get; set; } = false;
    }
}
