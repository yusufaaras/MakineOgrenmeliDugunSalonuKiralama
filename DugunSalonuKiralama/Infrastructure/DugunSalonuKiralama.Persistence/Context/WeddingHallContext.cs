using DugunSalonuKiralama.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DugunSalonuKiralama.Persistence.Context
{
    public class WeddingHallContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-S1QPNRR;Database=WeddingHall;User Id=sa;Password=1;TrustServerCertificate=True;");
        }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
        public DbSet<Wedding> Weddings { get; set; }
        public DbSet<WeddingFeature> WeddingFeatures { get; set; }
        public DbSet<WeddingHall> WeddingHalls { get; set; }
        public DbSet<WeddingPricing> WeddingPricings { get; set; }
    }
}
