using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class WeddingFeature
    {
        public int Id { get; set; }
        public int WeddingId { get; set; }
        public WeddingHall WeddingHall { get; set; }
        public int FeatureId { get; set; }
        public Feature Feature { get; set; }
    }

}
