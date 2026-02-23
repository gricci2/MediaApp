using MediaApp.Models;

namespace MediaApp.Services
{
    public interface IMediaItemService
    {
        Task<IEnumerable<MediaItem>> GetAllAsync(string userId);
        Task<MediaItem?> GetByIdAsync(int id, string userId);
        Task<MediaItem> CreateAsync(MediaItem meditaItem);

        Task<bool> UpdateAsync(MediaItem mediaItem);
        Task<bool> DeleteAsync(int id, string userId);

    }
}
