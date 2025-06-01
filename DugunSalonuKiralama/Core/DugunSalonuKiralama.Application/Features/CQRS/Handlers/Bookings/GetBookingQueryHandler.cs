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
                Id = x.Id,
                WeddingHallId = x.WeddingHallId,
                UserId = x.UserId,
                BookingDate = x.BookingDate,
                Alcohol=x.Alcohol,
                Capacity=x.Capacity,
                Cookie=x.Cookie,
                Session =x.Session,
                Price=x.Price,
                Food=x.Food,
                Name=x.Name,
                SurName=x.SurName,                
            }).ToList();
        }
    }
}
