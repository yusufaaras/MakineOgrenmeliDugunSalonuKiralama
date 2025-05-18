using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Interfaces
{
    public interface ISuggestionService
    {
        Task<List<PredictionResponse>> GetSuggestionsAsync(string userId);
    }
}
