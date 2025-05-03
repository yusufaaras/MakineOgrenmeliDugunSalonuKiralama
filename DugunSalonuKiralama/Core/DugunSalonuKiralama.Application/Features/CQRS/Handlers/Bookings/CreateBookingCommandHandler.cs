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
    public class CreateBookingCommandHandler
    {
        private IRepository<Booking> _repository;

        public CreateBookingCommandHandler(IRepository<Booking> repository)
        {
            _repository = repository;
        }
        public async Task Handle(CreateBookingCommand command)
        {
            await _repository.CreateAsync(new Booking
            {
                WeddingHallId = command.WeddingHallId,
                UserId = command.UserId,
                BookingDate = command.BookingDate,
                GuestCount = command.GuestCount,
                Status = command.Status,

            });
        }
    }
}
