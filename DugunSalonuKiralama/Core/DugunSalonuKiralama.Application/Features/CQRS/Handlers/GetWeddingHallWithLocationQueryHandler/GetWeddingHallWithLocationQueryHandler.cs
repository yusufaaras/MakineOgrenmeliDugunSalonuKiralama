using DugunSalonuKiralama.Application.Features.CQRS.Results.GetWeddingHallWithLocationQueryResult;
using DugunSalonuKiralama.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
                Name = x.Name,
                Capacity = x.Capacity,
                LocationId = x.LocationId,
                HomeImageUrl = x.HomeImageUrl,
                DetailImageUrl1 = x.DetailImageUrl1,
                DetailImageUrl2 = x.DetailImageUrl2,
                DetailImageUrl3 = x.DetailImageUrl3,
                DetailImageUrl4 = x.DetailImageUrl4,
                ShortDescription = x.ShortDescription,
                LongDescription = x.LongDescription,
            }).ToList();
        }
    }
}
