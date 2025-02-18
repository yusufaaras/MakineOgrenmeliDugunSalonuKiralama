
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class WeddingHall
    {
        //Düğün salonu
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public int LocationId { get; set; }
        public string HomeImageUrl { get; set; }
        public string? DetailImageUrl1 { get; set; }
        public string? DetailImageUrl2 { get; set; }
        public string? DetailImageUrl3 { get; set; }
        public string? DetailImageUrl4 { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public Location Location { get; set; }
    }

}
