using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Interfaces
{
    public interface IWeddingRepository
    {
        Task<List<Wedding>> GetCarsListWithBrands();
        List<Wedding> GetLast5CarsWithBrands();
        int GetCarCount();
    }
}
