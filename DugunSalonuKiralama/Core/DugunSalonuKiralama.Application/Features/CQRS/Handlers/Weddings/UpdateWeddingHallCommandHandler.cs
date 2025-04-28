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
            values.Capacity = command.Capacity;
            values.Address = command.Address;
            values.Food = command.Food;
            values.Alcohol = command.Alcohol;
            values.CategoryName = command.CategoryName;
            values.City = command.City;
            values.Country = command.Country;
            values.Cookie = command.Cookie;
            values.PostalCode = command.PostalCode;
            values.Price=command.Price;
            values.HomeImageUrl = command.HomeImageUrl;
            values.DetailImageUrl1 = command.DetailImageUrl1;
            values.DetailImageUrl2 = command.DetailImageUrl2;
            values.DetailImageUrl3 = command.DetailImageUrl3;
            values.DetailImageUrl4 = command.DetailImageUrl4;
            values.ShortDescription = command.ShortDescription;
            values.LongDescription = command.LongDescription;   
            await _repository.UpdateAsync(values);
        }
    }
}
