namespace MediaApp.DTOs
{
    public class MediaItemReadDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Type { get; set; }

        public bool IsCompleted { get; set; }

        public string? Information { get; set; }
    }
}
