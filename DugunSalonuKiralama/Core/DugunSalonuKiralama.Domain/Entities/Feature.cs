using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class Feature
    {
        public int Id { get; set; }
        public string Name { get; set; } // Klima, Otopark vs.
        public ICollection<WeddingFeature> WeddingFeatures { get; set; }
    }

}
