using DugunSalonuKiralama.Application.Features.CQRS.Queries.Locations;
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
    public class GetLocationByIdQueryHandler
    {
        private IRepository<Location> _repository;

        public GetLocationByIdQueryHandler(IRepository<Location> repository)
        {
            _repository = repository;
        }

        public async Task<GetLocationByIdQueryResult> Handle(GetLocationByIdQuery query)
        {
            var values = await _repository.GetByIdAsync(query.Id);
            return new GetLocationByIdQueryResult
            {
                Id = values.Id,
                Address = values.Address,
                City = values.City,
                Country = values.Country,

            };



        }
    }

}