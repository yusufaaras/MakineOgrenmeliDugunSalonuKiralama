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
            // Aynı gün ve aynı düğün salonu için rezervasyon var mı kontrol et
            var existingBookings = await _repository.GetAllAsync();
            var isAlreadyBooked = existingBookings.Any(x =>
                x.WeddingHallId == command.WeddingHallId &&
                x.BookingDate.Date == command.BookingDate.Date);

            if (isAlreadyBooked)
            {
                throw new Exception("Bu tarih için zaten bir rezervasyon yapılmış.");
            }

            // Eğer rezervasyon yoksa kaydet
            await _repository.CreateAsync(new Booking
            {
                WeddingHallId = command.WeddingHallId,
                UserId = command.UserId,
                BookingDate = command.BookingDate,
                Alcohol = command.Alcohol,
                Capacity = command.Capacity,
                Cookie = command.Cookie,
                Food = command.Food,
                Price = command.Price,
                Name = command.Name,
                SurName = command.SurName,
            });
        }

    }
}
