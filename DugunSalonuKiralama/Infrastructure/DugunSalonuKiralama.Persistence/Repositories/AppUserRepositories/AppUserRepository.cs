using DugunSalonuKiralama.Application.Interfaces.AppUserInterfaces;
using DugunSalonuKiralama.Domain.Entities;
using DugunSalonuKiralama.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Persistence.Repositories.AppUserRepositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly WeddingHallContext _context;
        public AppUserRepository(WeddingHallContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetByFilterAsync(Expression<Func<AppUser, bool>> filter)
        {
            var values = await _context.AppUsers
                .Where(filter)
                .Include(r => r.AppRole)
                .FirstOrDefaultAsync();
            return values;
        }
    }
}
