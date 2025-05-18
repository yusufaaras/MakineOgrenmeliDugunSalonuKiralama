using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Interfaces
{
    public interface IUserActivityService
    {
        Task<int> GetAverageViewedHallCapacityAsync(string userId);
    }
}
