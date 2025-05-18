using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using DugunSalonuKiralama.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Services
{
    
    public class SuggestionService : ISuggestionService
    {
        private double MapLocationToDouble(string location)
        {
            var locationMap = new Dictionary<string, double>
    {
        { "İstanbul", 0 },
        { "Ankara", 1 },
        { "İzmir", 2 },
        { "Bursa", 3 },
        { "Antalya", 4 }
        
    };

            return locationMap.ContainsKey(location) ? locationMap[location] : -1; 
        }
        private double MapYesNoToDouble(string? value)
        {
            // örneğin: "Var" -> 1, "Yok" -> 0
            if (string.IsNullOrEmpty(value)) return 0;
            return value.ToLower() == "var" ? 1 : 0;
        }
        private readonly IUserActivityService _userActivityService;
        private readonly PredictionService _predictionService;
        private readonly WeddingHallContext _context; 

       

        public SuggestionService(IUserActivityService userActivityService, PredictionService predictionService, WeddingHallContext context)
        {
            _context = context;
            _userActivityService = userActivityService;
            _predictionService = predictionService;
        }

        public async Task<List<PredictionResponse>> GetSuggestionsAsync(string userId)
        {
            var viewedHalls = await _context.ViewedHalls
                .Where(v => v.UserId == userId)
                .Include(v => v.WeddingHall)
                .Select(v => v.WeddingHall)
                .Distinct()
                .ToListAsync();

            var suggestions = new List<PredictionResponse>();

            

            foreach (var hall in viewedHalls)
            {
                var locationAsDouble = MapLocationToDouble(hall.Address);
                var foodServiceAsDouble = MapYesNoToDouble(hall.Food);
                var cookieServiceAsDouble = MapYesNoToDouble(hall.Cookie);
                var alcoholServiceAsDouble = MapYesNoToDouble(hall.Alcohol);

                var predictedPrice = await _predictionService.PredictAsync(new double[] 
                { 
                    hall.Capacity,
                    1,
                    1,
                    1,
                    1//locationAsDouble,
                    //foodServiceAsDouble,
                    //cookieServiceAsDouble,
                    //alcoholServiceAsDouble
                });


                suggestions.Add(new PredictionResponse
                {
                    Capacity = hall.Capacity,
                    PredictedPrice = predictedPrice,
                   
                });

               
            }

            return suggestions;
        }
    }
}
