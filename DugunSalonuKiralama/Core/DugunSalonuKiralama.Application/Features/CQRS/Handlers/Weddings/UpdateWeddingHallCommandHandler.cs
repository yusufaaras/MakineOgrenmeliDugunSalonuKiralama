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
    public class UpdateWeddingHallCommandHandler
    {
        private IRepository<WeddingHall> _repository;

        public UpdateWeddingHallCommandHandler(IRepository<WeddingHall> repository)
        {
            _repository = repository;
        }
        public async Task Handle(UpdateWeddingHallCommand command)
        {
            var values = await _repository.GetByIdAsync(command.Id);
            values.Name = command.Name;
            values.Capacity= command.Capacity;
            await _repository.UpdateAsync(values);
        }
    }
}
