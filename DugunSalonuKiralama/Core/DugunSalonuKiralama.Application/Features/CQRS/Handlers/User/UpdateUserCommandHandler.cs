using DugunSalonuKiralama.Application.Features.CQRS.Commands.User;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.BrandHandlers
{
    public class UpdateUserCommandHandler
    {
        private readonly IRepository<AppUser> _repository;
        public UpdateUserCommandHandler(IRepository<AppUser> repository)
        {
            _repository = repository;
        }

        public async Task Handle(UpdateUserCommand command)
        {
            var values = await _repository.GetByIdAsync(command.AppUserID);
            values.Username = command.Username;
            values.Password = command.Password;
            values.Name = command.Name;
            values.Surname = command.Surname;
            values.Email = command.Email;
            values.AppRoleID = command.AppRoleID;
            await _repository.UpdateAsync(values);
        }
    }
}