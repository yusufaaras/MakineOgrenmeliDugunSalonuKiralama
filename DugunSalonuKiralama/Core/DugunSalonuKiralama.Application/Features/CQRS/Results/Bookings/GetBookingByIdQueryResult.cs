using DugunSalonuKiralama.Application.Features.CQRS.Results.WeddingHall;
using DugunSalonuKiralama.Domain.Entities;
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
        public int WeddingHallId { get; set; }
        public int UserId { get; set; }
        public string Alcohol { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Cookie { get; set; }
        public string Food { get; set; }
        public string Session { get; set; }
        public string Price { get; set; }
        public int Capacity { get; set; }
        public DateTime BookingDate { get; set; }
    }
}
