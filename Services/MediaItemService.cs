using Microsoft.EntityFrameworkCore;
using MediaApp.Data;
using MediaApp.Models;
using MediaApp.DTOs;

namespace MediaApp.Services
{
    public class MediaItemService : IMediaItemService
    {
        private readonly MediaItemDbContext _context;

        public MediaItemService(MediaItemDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<MediaItemReadDto>> GetAllAsync(string userId)
        {
            return await _context.MediaItems/*.Where(m => m.UserId == userId)*/.Select(item => new MediaItemReadDto { 
            Id = item.Id,
            Title = item.Title,
            Type = item.Type.ToString(),
            IsCompleted = item.IsCompleted,
            Information = item.Information
            }).ToListAsync();
        }
        public async Task<MediaItemReadDto?> GetByIdAsync(int id, string userId)
        {
            return await _context.MediaItems.Where(m => m.Id == id && m.UserId == userId).Select(item => new MediaItemReadDto
            {
                Id = item.Id,
                Title = item.Title,
                Type = item.Type.ToString(),
                IsCompleted = item.IsCompleted,
                Information = item.Information
            }).FirstOrDefaultAsync();
        }
        public async Task<MediaItemReadDto> CreateAsync(MediaItemCreateDto mediaItem, string userId)
        {
            var mediaItemDto = new MediaItem
            {
                Title = mediaItem.Title,
                Type = mediaItem.Type,
                IsCompleted = mediaItem.IsCompleted,
                Information = mediaItem.Information,
                UserId = userId
            };

            _context.MediaItems.Add(mediaItemDto);
            await _context.SaveChangesAsync();

            //var readDto = new MediaItemReadDto
            //{
            //    Id = mediaItemDto.Id,
            //    Title = mediaItemDto.Title,
            //    Type = mediaItemDto.Type.ToString(),
            //    IsCompleted = mediaItemDto.IsCompleted,
            //    Information = mediaItemDto.Information
            //};
            
            return new MediaItemReadDto
            {
                Id = mediaItemDto.Id,
                Title = mediaItemDto.Title,
                Type = mediaItemDto.Type.ToString(),
                IsCompleted = mediaItemDto.IsCompleted,
                Information = mediaItemDto.Information
            };
        }
        public async Task<bool> UpdateAsync(MediaItemUpdateDto mediaItem, string userId)
        {
            var existing = await _context.MediaItems.FirstOrDefaultAsync(m => m.Id == mediaItem.Id && m.UserId == userId);

            if (existing == null) return false;

            existing.Title = mediaItem.Title;
            existing.Type = mediaItem.Type;
            existing.IsCompleted = mediaItem.IsCompleted;
            existing.Information = mediaItem.Information;

            await _context.SaveChangesAsync();
            return true;
        }

        //try
        //    {
        //        await _service.UpdateAsync(MediaItem);
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!MediaItemExists(MediaItem.Id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }
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
