using DugunSalonuKiralama.Application.Interfaces.AppRoleInterfaces;
using DugunSalonuKiralama.Domain.Entities;
using DugunSalonuKiralama.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Persistence.Repositories.AppRoleRepositories
{
    public class AppRoleRepository : IAppRoleRepository
    {
        private readonly WeddingHallContext _context;
        public AppRoleRepository(WeddingHallContext context)
        {
            _context = context;
        }

        public async Task<AppRole> GetByFilterAsync(Expression<Func<AppRole, bool>> filter)
        {
            var values = await _context.AppRoles
                .Where(filter)
                .FirstOrDefaultAsync();
            return values;
        }
    }
}