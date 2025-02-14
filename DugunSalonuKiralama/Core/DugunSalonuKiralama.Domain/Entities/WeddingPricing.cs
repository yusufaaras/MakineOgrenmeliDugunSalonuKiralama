using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class WeddingPricing
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public int WeddingId { get; set; }
        public Wedding Wedding { get; set; }
    }

}
