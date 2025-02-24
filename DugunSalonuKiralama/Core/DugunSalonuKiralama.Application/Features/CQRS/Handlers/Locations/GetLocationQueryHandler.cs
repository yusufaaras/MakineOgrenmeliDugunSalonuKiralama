using DugunSalonuKiralama.Application.Features.CQRS.Results.Locations;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Locations
{
    public class GetLocationQueryHandler
    {
        private IRepository<Location> _repository;

        public GetLocationQueryHandler(IRepository<Location> repository)
        {
            _repository = repository;
        }

        public async Task<List<GetLocationQueryResult>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x=> new GetLocationQueryResult
            {
                Id = x.Id,
                Address = x.Address,
                City = x.City,  
                Country = x.Country,
            }).ToList();
        }
    }
}
