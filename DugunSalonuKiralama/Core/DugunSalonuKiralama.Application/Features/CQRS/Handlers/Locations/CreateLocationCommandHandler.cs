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
    public class CreateLocationCommandHandler
    {
        private IRepository<Location> _repository;
        public CreateLocationCommandHandler(IRepository<Location> repository)
        {
            _repository = repository;
        }
        public async Task Handle(CreateLocationCommand command)
        {
            await _repository.CreateAsync(new Location
            {
                
                Address = command.Address,
                City = command.City,
                Country = command.Country
            });
        }
    }
}
