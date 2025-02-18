using DugunSalonuKiralama.Application.Features.CQRS.Queries.WeddingHall;
using DugunSalonuKiralama.Application.Features.CQRS.Results.WeddingHall;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Wedding
{
    public class GetWeddingHallByIdQueryHandler
    {
        private readonly IRepository<WeddingHall> _repository;
        public GetWeddingHallByIdQueryHandler(IRepository<WeddingHall> repository)
        {
            _repository = repository;
        }
        public async Task<GetWeddingHallByIdQueryResult> Handle(GetWeddingHallByIdQuery query)
        {
            var values = await _repository.GetByIdAsync(query.Id);
            return new GetWeddingHallByIdQueryResult
            {
                Id = values.Id,
                Name = values.Name,
                Capacity = values.Capacity,
                LocationId = values.LocationId,
            };
        }
    }
}

