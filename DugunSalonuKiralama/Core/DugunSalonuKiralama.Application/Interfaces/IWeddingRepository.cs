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
        Task<List<WeddingHall>> GetWeddingHallsListWithLocation();
        List<WeddingHall> GetLast5WeddingHallsWithLocation();
        int GetWeddingHallCount();
    }
}
