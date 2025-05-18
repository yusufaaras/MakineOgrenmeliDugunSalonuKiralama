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
            public int Location { get; set; }
            public int FoodService { get; set; }
            public int CookieService { get; set; }
            public int AlcoholServices { get; set; }
            public double PredictedPrice { get; set; } 

    }
}
