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
        public async Task Handle(UpdataBookingCommand command)
        {
            var values = await _repository.GetByIdAsync(command.Id);
            values.WeddingId = command.WeddingId;
            values.WeddingHall= command.WeddingHall;
            values.UserId = command.UserId;
            values.BookingDate = command.BookingDate;
            values.GuestCount = command.GuestCount;
            values.TotalPrice = command.TotalPrice;
            values.Status = command.Status;
            await _repository.UpdateAsync(values);
        }
    }
}
