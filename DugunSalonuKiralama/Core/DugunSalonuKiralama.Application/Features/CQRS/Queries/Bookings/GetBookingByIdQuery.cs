using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Queries.Booking
{
    public class GetBookingByIdQuery
    {
        public GetBookingByIdQuery(int id) 
        {
            Id = id;
        }
        public int Id { get; set; }
    }
}
