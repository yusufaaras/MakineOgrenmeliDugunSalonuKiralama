using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class WeddingDescription
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int WeddingId { get; set; }
        public Wedding Wedding { get; set; }
    }

}
