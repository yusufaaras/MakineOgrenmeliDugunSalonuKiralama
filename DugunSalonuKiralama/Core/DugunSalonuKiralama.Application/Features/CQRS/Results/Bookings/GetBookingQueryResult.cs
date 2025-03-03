﻿using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DugunSalonuKiralama.Domain.Entities;
using DugunSalonuKiralama.Application.Features.CQRS.Results.WeddingHall;

namespace DugunSalonuKiralama.Application.Features.CQRS.Results.Booking
{
    public class GetBookingQueryResult
    {
        public int Id { get; set; }
        public int WeddingId { get; set; }
        public int UserId { get; set; }
        public DateTime BookingDate { get; set; }
        public int GuestCount { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
    }
}
