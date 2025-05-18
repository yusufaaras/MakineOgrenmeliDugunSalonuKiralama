using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Persistence.Context;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DugunSalonuKiralama.Persistence.Services
{
    public class UserActivityService : IUserActivityService
    {
        private readonly WeddingHallContext _context;

        public UserActivityService(WeddingHallContext context)
        {
            _context = context;
        }
        public async Task<int> GetAverageViewedHallCapacityAsync(string userId)
        {
            return (int)await _context.ViewedHalls
                .Include(x => x.WeddingHall)
                .Where(x => x.UserId == userId)
                .AverageAsync(x => (double)x.WeddingHall.Capacity);
        }
    }
}
