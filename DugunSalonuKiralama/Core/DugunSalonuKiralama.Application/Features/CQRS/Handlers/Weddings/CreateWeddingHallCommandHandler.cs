using Azure.Core;
using DugunSalonuKiralama.Application.Features.CQRS.Commands.Wedding;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Weddings
{
    public class CreateWeddingHallCommandHandler
    {
        private IRepository<WeddingHall> _repository;

        public CreateWeddingHallCommandHandler(IRepository<WeddingHall> repository)
        {
            _repository = repository;
        }
        public async Task Handle(CreateWeddingHallCommand command)
        {
            await _repository.CreateAsync(new WeddingHall
            {
                Name = command.Name,
                Capacity = command.Capacity,
                LocationId = command.LocationId,
                CategoryId = command.CategoryId,
                HomeImageUrl = command.HomeImageUrl,
                DetailImageUrl1 = command.DetailImageUrl1,
                DetailImageUrl2 = command.DetailImageUrl2,
                DetailImageUrl3 = command.DetailImageUrl3,
                DetailImageUrl4 = command.DetailImageUrl4,
                ShortDescription = command.ShortDescription,
                LongDescription = command.LongDescription,
            });
        }
    }
}