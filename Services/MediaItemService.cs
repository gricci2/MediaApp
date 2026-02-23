using Microsoft.EntityFrameworkCore;
using MediaApp.Data;
using MediaApp.Models;

namespace MediaApp.Services
{
    public class MediaItemService : IMediaItemService
    {
        private readonly MediaItemDbContext _context;

        public MediaItemService(MediaItemDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<MediaItem>> GetAllAsync(string userId)
        {
            return await _context.MediaItems.Where(m => m.UserId == userId).ToListAsync();
        }
        public async Task<MediaItem?> GetByIdAsync(int id, string userId)
        {
            return await _context.MediaItems.FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);
        }
        public async Task<MediaItem> CreateAsync(MediaItem mediaItem)
        {
            _context.MediaItems.Add(mediaItem);
            await _context.SaveChangesAsync();
            return mediaItem;
        }
        public async Task<bool> UpdateAsync(MediaItem mediaItem)
        {
            var existing = await _context.MediaItems.FirstOrDefaultAsync(m => m.Id == mediaItem.Id && m.UserId == mediaItem.UserId);

            if (existing == null) return false;

            existing.Title = mediaItem.Title;
            existing.Type = mediaItem.Type;
            existing.IsCompleted = mediaItem.IsCompleted;
            existing.Information = mediaItem.Information;

            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteAsync(int id, string userId)
        {
            var existing = await _context.MediaItems.FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);

            if (existing == null) return false;

            _context.Remove(existing);

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
