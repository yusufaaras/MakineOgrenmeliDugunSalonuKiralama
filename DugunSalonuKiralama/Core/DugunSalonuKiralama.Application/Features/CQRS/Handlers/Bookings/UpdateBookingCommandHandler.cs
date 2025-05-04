using DugunSalonuKiralama.Application.Features.CQRS.Commands.Booking;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Bookings
{
    public class UpdateBookingCommandHandler
    {
        private IRepository<Booking> _repository;
        public UpdateBookingCommandHandler(IRepository<Booking> repository)
        {
            _repository = repository;
        }
        public async Task Handle(UpdateBookingCommand command)
        {
            var values = await _repository.GetByIdAsync(command.Id);
            values.UserId = command.UserId;
            values.BookingDate = command.BookingDate;
            values.Price = command.Price;
            values.Alcohol = command.Alcohol;
            values.Food = command.Food;
            values.Capacity = command.Capacity;
            values.Cookie = command.Cookie;
            values.Name = command.Name;
            values.SurName = command.SurName;
            await _repository.UpdateAsync(values);
        }
    }
}
