using DugunSalonuKiralama.Application.Features.CQRS.Results.WeddingHall;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Results.Booking
{
    public class GetBookingByIdQueryResult
    {
        public int Id { get; set; }
        public int WeddingId { get; set; }
        public GetWeddingHallQueryResult WeddingHall { get; set; }
        public int UserId { get; set; }
        public DateTime BookingDate { get; set; }
        public int GuestCount { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
    }
}
