using DugunSalonuKiralama.Application.Enums;
using DugunSalonuKiralama.Application.Features.Mediator.Commands.AppUserCommands;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.Mediator.Handlers.AppUserHandlers
{
    public class CreateAppUserCommandHandler : IRequestHandler<CreateAppUserCommand>
    {
        private readonly IRepository<AppUser> _repository;
        public CreateAppUserCommandHandler(IRepository<AppUser> repository)
        {
            _repository = repository;
        }

        public async Task Handle(CreateAppUserCommand request, CancellationToken cancellationToken)
        {
            await _repository.CreateAsync(new AppUser 
            {
                Username = request.Username,
                Password = request.Password,
                AppRoleID = (int)RolesType.Member,              
                Name = request.Name,
                Surname = request.Surname,
                Email = request.Email
            });
        }
    }
}
