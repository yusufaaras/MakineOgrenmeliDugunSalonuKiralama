using DugunSalonuKiralama.Application.Features.CQRS.Results.GetWeddingHallWithLocationQueryResult;
using DugunSalonuKiralama.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.GetWeddingHallWithLocationQueryHandler
{
    public class GetWeddingHallWithLocationQueryHandler
    {
        private readonly IWeddingRepository _repository;

        public GetWeddingHallWithLocationQueryHandler(IWeddingRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<GetWeddingHallWithLocationQueryResult>> Handle()
        {
            var values = await _repository.GetWeddingHallsListWithLocation();
            return values.Select(x => new GetWeddingHallWithLocationQueryResult
            {
                Id = x.Id,
                Location = x.Location.Address,
                LocationId = x.LocationId,
                Name = x.Name,
                Capacity= x.Capacity,
            }).ToList();
        }
    }
}
