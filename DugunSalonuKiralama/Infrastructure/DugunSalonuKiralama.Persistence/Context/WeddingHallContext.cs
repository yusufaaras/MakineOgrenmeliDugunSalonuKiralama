﻿using DugunSalonuKiralama.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DugunSalonuKiralama.Persistence.Context
{
    public class WeddingHallContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-S1QPNRR;Database=WeddingHall;Integrated Security=True;TrustServerCertificate=True");
            //optionsBuilder.UseSqlServer("Data Source=DESKTOP-K3V8TSN\\SQLEXPRESS;Initial Catalog=WeddingHall;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");

           // optionsBuilder.UseSqlServer("Data Source=DESKTOP-K3V8TSN\\SQLEXPRESS;Initial Catalog=WeddingHall;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");


        }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
        public DbSet<WeddingFeature> WeddingFeatures { get; set; }
        public DbSet<WeddingHall> WeddingHalls { get; set; }
        public DbSet<WeddingPricing> WeddingPricings { get; set; }
    }
}
