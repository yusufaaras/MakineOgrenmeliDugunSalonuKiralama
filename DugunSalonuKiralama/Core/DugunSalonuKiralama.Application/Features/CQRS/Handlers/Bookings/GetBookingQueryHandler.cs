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
        private IRepository<Location> _repository;

        public GetBookingQueryHandler(IRepository<Location> repository)
        {
            _repository = repository;
        }
        public async Task<GetBookingQueryResult> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x => new GetBookingQueryResult
            {
                WeddingId = x.Id,
                WeddingHall = x.WeddingHall,






            });
        }
    }
}
