using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Interfaces.AppRoleInterfaces
{
    public interface IAppRoleRepository
    {
        Task<AppRole> GetByFilterAsync(Expression<Func<AppRole, bool>> filter);
    }
}
