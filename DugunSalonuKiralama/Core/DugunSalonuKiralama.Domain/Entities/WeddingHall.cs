
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class WeddingHall
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public int LocationId { get; set; }
        public Location Location { get; set; }
        public ICollection<Wedding> Weddings { get; set; }
    }

}
