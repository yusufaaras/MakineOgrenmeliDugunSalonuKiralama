using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using DugunSalonuKiralama.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Persistence.Repositories
{
    public class WeddingHallRepository:IWeddingRepository
    {
        private readonly WeddingHallContext _context;

        public WeddingHallRepository(WeddingHallContext context)
        {
            _context = context;
        }

        public int GetWeddingHallCount()
        {
            var value = _context.WeddingHalls.Count();
            return value;
        }

        public async Task<List<WeddingHall>> GetWeddingHallsListWithLocation()
        {
            var values = await _context.WeddingHalls.Include(x => x.Location).ToListAsync();
            return values;
        }
        public List<WeddingHall> GetLast5WeddingHallsWithLocation()
        {
            var values = _context.WeddingHalls.Include(x => x.Location).OrderByDescending(x => x.Id).Take(5).ToList();
            return values;
        }
    }
}
