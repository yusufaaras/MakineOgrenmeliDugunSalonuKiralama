using DugunSalonuKiralama.Application.Features.CQRS.Commands.Locations;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Locations
{
    public class UpdateLocationCommandHandler
    {
        private readonly IRepository<Location> _repository;
        public UpdateLocationCommandHandler(IRepository<Location> repository)
        {
            _repository = repository;
        }
        public async Task Handle(UpdateLocationCommand command)
        {
            var values = await _repository.GetByIdAsync(command.Id);

            values.Id = command.Id;

            values.Address = command.Address;
            values.Country = command.Country;
            values.City = command.City;

            await _repository.UpdateAsync(values);
        }
    }
}
