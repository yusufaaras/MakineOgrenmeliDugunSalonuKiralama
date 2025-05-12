using DugunSalonuKiralama.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DugunSalonuKiralama.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly PredictionService _predictionService;

        public TestController(PredictionService predictionService)
        {
            _predictionService = predictionService;
        }

        [HttpPost("predict")]
        public async Task<IActionResult> Predict()
        {
            double[] input = new double[] { 5.1, 3.5, 1.4, 0.2 }; // Örnek veri
            var result = await _predictionService.PredictAsync(input);
            return Ok(result);
        }
    }
}
