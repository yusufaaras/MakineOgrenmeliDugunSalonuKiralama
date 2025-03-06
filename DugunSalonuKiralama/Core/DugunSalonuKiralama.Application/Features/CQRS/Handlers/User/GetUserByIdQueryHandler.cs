using DugunSalonuKiralama.Application.Features.CQRS.Queries.User;
using DugunSalonuKiralama.Application.Features.CQRS.Results.BannerResults;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.User
{
    public class GetUserByIdQueryHandler
    {
        private readonly IRepository<AppUser> _repository;
        public GetUserByIdQueryHandler(IRepository<AppUser> repository)
        {
            _repository = repository;
        }

        public async Task<GetUserByIdQueryResult> Handle(GetUserByIdQuery query)
        {
            var values = await _repository.GetByIdAsync(query.Id);
            return new GetUserByIdQueryResult
            {
                AppUserID = values.AppUserID,
                Username = values.Username,
                Password = values.Password,
                Name = values.Name,
                Surname = values.Surname,
                Email = values.Email,
                AppRoleID = values.AppRoleID
            };
        }
    }
}
