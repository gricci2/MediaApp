using MediaApp.Models;
using MediaApp.DTOs;

namespace MediaApp.Services
{
    public interface IMediaItemService
    {
        Task<IEnumerable<MediaItemReadDto>> GetAllAsync(string userId);
        Task<MediaItemReadDto?> GetByIdAsync(int id, string userId);
        Task<MediaItemReadDto> CreateAsync(MediaItemCreateDto mediaItem, string userId);

        Task<bool> UpdateAsync(MediaItemUpdateDto mediaItem, string userId);
        Task<bool> DeleteAsync(int id, string userId);

    }
}
