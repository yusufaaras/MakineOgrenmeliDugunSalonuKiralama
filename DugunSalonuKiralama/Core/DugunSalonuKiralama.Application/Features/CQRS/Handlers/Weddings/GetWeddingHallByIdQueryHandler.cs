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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
                Address = values.Address,
                City = values.City,
                Country = values.Country,
                Cookie = values.Cookie,
                Price =values.Price,
                Alcohol = values.Alcohol,
                Food=values.Food,
                UserId = values.UserId,
                HomeImageUrl = values.HomeImageUrl,
                DetailImageUrl1 = values.DetailImageUrl1,
                DetailImageUrl2 = values.DetailImageUrl2,
                DetailImageUrl3 = values.DetailImageUrl3,
                DetailImageUrl4 = values.DetailImageUrl4,
                ShortDescription = values.ShortDescription,
                LongDescription = values.LongDescription,
            };
        }
    }
}

