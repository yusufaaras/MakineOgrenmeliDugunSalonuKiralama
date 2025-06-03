using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Results.WeddingHall
{
    public class GetWeddingHallByIdQueryResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Price { get; set; }
        public string Alcohol { get; set; }
        public string Cookie { get; set; }
        public string Food { get; set; }
        public int UserId { get; set; }
        public string HomeImageUrl { get; set; }
        public string? DetailImageUrl1 { get; set; }
        public string? DetailImageUrl2 { get; set; }
        public string? DetailImageUrl3 { get; set; }
        public string? DetailImageUrl4 { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
    }
}
