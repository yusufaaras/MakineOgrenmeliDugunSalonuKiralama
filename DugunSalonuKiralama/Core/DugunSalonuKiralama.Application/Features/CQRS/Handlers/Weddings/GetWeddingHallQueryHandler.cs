using DugunSalonuKiralama.Application.Features.CQRS.Results.WeddingHall;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Wedding
{
    public class GetWeddingHallQueryHandler
    {
        private readonly IRepository<WeddingHall> _repository;

        public GetWeddingHallQueryHandler(IRepository<WeddingHall> repository)
        {
            _repository = repository;
        }
        public async Task<List<GetWeddingHallQueryResult>> Handle()
        {
            var values = await _repository.GetAllAsync();
            return values.Select(x => new GetWeddingHallQueryResult
            {
                Id = x.Id,
                Name = x.Name,
                Capacity = x.Capacity,
                LocationId = x.LocationId
            }).ToList();
        }
    }
}
