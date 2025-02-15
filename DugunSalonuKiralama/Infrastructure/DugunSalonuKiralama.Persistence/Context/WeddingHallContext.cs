using DugunSalonuKiralama.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using OnionCarBook.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Persistence.Context
{
    public class WeddingHallContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=WeddingHall;Username=postgres;Password=yusuf123;");
        }

        public DbSet<Availability> Availabilities { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
        public DbSet<Wedding> Weddings { get; set; }
        public DbSet<WeddingDescription> WeddingDescriptions { get; set; }
        public DbSet<WeddingFeature> WeddingFeatures { get; set; }
        public DbSet<WeddingHall> WeddingHalls { get; set; }
        public DbSet<WeddingPricing> WeddingPricings { get; set; }
    }
}
