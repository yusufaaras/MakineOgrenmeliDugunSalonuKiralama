using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Domain.Entities
{
    public class PredictionResponse
    {
            public double Capacity { get; set; }
            public int LocationIndex { get; set; }
            public int Season { get; set; }
            public int FoodService { get; set; }
            public int MusicService { get; set; }
            public int ExtraServices { get; set; }
            public double PredictedPrice { get; set; }

    }
}
