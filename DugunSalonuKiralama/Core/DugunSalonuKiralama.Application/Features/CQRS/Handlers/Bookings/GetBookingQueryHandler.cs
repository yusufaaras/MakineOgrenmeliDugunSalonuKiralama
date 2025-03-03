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
    public class GetBookingQueryHandler
    {
        private IRepository<Booking> _repository;

        public GetBookingQueryHandler(IRepository<Booking> repository)
        {
            _repository = repository;
        }
        public async Task<List<GetBookingQueryResult>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x => new GetBookingQueryResult
            {
                WeddingId = x.WeddingHallId,
                UserId = x.UserId,
                BookingDate = x.BookingDate,
                GuestCount = x.GuestCount,
                TotalPrice = x.TotalPrice,
                Status = x.Status,

            }).ToList();
        }
    }
}
