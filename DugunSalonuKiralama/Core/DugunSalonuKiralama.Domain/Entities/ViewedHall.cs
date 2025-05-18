using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class ViewedHall
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int WeddingHallId { get; set; }
        public WeddingHall WeddingHall { get; set; }
        public DateTime ViewedAt { get; set; }
    }
}
