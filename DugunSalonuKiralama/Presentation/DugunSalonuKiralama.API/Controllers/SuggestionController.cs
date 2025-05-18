using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DugunSalonuKiralama.Application.Services;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System.Security.Claims;

namespace DugunSalonuKiralama.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuggestionController : ControllerBase
    {
        private readonly ISuggestionService _suggestionService;

        public SuggestionController(ISuggestionService suggestionService)
        {
            _suggestionService = suggestionService;
        }

        [HttpPost("Predict")]
        public async Task<IActionResult> GetSuggestionsAsync(string userId)
        {
            var suggestions = await _suggestionService.GetSuggestionsAsync(userId);
            return Ok(suggestions);
        }
    }
}