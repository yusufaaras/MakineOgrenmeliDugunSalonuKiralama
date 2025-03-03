using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class Booking
    {
        //(rezervasyon)
        public int Id { get; set; }
        public int WeddingHallId { get; set; }
        public WeddingHall WeddingHall { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public DateTime BookingDate { get; set; }
        public int GuestCount { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } // Confirmed, Pending, Cancelled
    }

}
