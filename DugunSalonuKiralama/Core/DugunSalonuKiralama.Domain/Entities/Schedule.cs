using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class Schedule
    {
        //(çizelgeleme için)
        public int Id { get; set; }
        public int WeddingHallId { get; set; }
        public WeddingHall WeddingHall { get; set; }
        public DateTime EventDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public bool IsReserved { get; set; }
    }

}
