using DugunSalonuKiralama.Application.Features.CQRS.Commands.Mail;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Email
{
    public class CreateMailCommandHandler
    {
        private readonly IRepository<Mail> _repository;

        public CreateMailCommandHandler(IRepository<Mail> repository)
        {
            _repository = repository;
        }

        public async Task Handle(CreateMailCommand command)
        {
            await _repository.CreateAsync(new Mail
            {
                FullName = command.FullName,
                Email = command.Email,
                PhoneNumber = command.PhoneNumber,
                Description = command.Description,

            });
        }
    }
}
