using MediaApp.Models;
using Microsoft.EntityFrameworkCore;


namespace MediaApp.Data
{
    public class MediaItemDbContext : DbContext
    {
        public MediaItemDbContext(DbContextOptions<MediaItemDbContext> options)
            :base(options)
        {

        }

        public DbSet<MediaItem> MediaItems { get; set; } = null!;
    }
}