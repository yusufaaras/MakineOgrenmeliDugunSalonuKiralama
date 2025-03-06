using DugunSalonuKiralama.Application.Features.CQRS.Results.BannerResults;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.BrandHandlers
{
    public class GetUserQueryHandler
    {
        private readonly IRepository<AppUser> _repository;
        public GetUserQueryHandler(IRepository<AppUser> repository)
        {
            _repository = repository;
        }
        public async Task<List<GetUserQueryResult>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x => new GetUserQueryResult
            {
                AppUserID = x.AppUserID,
                Name  = x.Name,
                Username = x.Username,
                Password = x.Password,
                Surname = x.Surname,
                Email = x.Email,
                AppRoleID = x.AppRoleID,
            }).ToList();
        }
    }
}