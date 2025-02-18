using DugunSalonuKiralama.Application.Features.CQRS.Commands.Wedding;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Wedding
{
    public class RemoveWeddingHallCommandHandler
    {
        private readonly IRepository<WeddingHall> _repository;
        public RemoveWeddingHallCommandHandler(IRepository<WeddingHall> repository)
        {
            _repository = repository;
        }
        public async Task Handle(RemoveWeddingHallCommand command)
        {
            var value = await _repository.GetByIdAsync(command.Id);
            await _repository.RemoveAsync(value);
        }
    }
}
