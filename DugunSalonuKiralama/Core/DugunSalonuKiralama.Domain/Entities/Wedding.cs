using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class Wedding
    {
        //Etkinlik
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int LocationId { get; set; }
        public Location Location { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<WeddingFeature> WeddingFeatures { get; set; }
        public ICollection<WeddingPricing> WeddingPricings { get; set; }
        public ICollection<Testimonial> Testimonials { get; set; }
    }

}
