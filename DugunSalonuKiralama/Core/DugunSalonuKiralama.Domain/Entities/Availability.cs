using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class Availability
    {
        //(kullanılabilirlik)
        public int Id { get; set; }
        public int WeddingHallId { get; set; }
        public WeddingHall WeddingHall { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsAvailable { get; set; }
    }

}
