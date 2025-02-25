using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Queries.Locations
{
    public class GetLocationByIdQuery
    {
        public GetLocationByIdQuery(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }
}

