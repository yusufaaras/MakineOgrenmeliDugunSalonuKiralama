using DugunSalonuKiralama.Application.Features.CQRS.Queries.Booking;
using DugunSalonuKiralama.Application.Features.CQRS.Results.Booking;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Bookings
{
    public class GetBookingByIdQueryHandler
    {

        private IRepository<Booking> _repository;

        public GetBookingByIdQueryHandler(IRepository<Booking> repository)
        {
            _repository = repository;
        }
        public async Task<GetBookingByIdQueryResult> Handle(GetBookingByIdQuery query)
        {
            var values = await _repository.GetByIdAsync(query.Id);
            return new GetBookingByIdQueryResult
            {
                WeddingHallId = values.WeddingHallId,
                UserId = values.UserId,
                BookingDate = values.BookingDate,
                GuestCount = values.GuestCount,
                TotalPrice = values.TotalPrice,
                Status = values.Status,


            };
        }
    }
}
