using DugunSalonuKiralama.Application.Features.CQRS.Results.WeddingHall;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
                Id=x.Id,
                Name = x.Name,
                Capacity = x.Capacity,
                Alcohol = x.Alcohol,
                Food = x.Food,
                CategoryName = x.CategoryName,
                Cookie = x.Cookie,
                PostalCode = x.PostalCode,
                Country = x.Country,
                Price = x.Price,
                City = x.City,
                Address=x.Address,
                UserId = x.UserId,
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
