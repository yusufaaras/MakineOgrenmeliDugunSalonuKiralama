using DugunSalonuKiralama.Application.Services;
using DugunSalonuKiralama.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DugunSalonuKiralama.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly PredictionService _predictionService;
        private readonly ILogger<TestController> _logger;

        public TestController(PredictionService predictionService, ILogger<TestController> logger)
        {
            _predictionService = predictionService;
            _logger = logger;
        }

        [HttpPost("predict")]
        public async Task<IActionResult> Predict([FromBody] PredictionResponse request)
        {
            if (request == null)
            {
                return BadRequest("Geçersiz tahmin isteği. Veriler boş olamaz.");
            }

            // Gelen verileri bir diziye dönüştürüyoruz
            double[] input = new double[]
            {
        request.Capacity,
        request.LocationIndex,
        request.Season,
        request.FoodService,
        request.MusicService,
        request.ExtraServices
            };

            try
            {
                _logger.LogInformation($"Tahmin isteği alındı: {JsonSerializer.Serialize(request)}");

                // Tahmin et
                var predictedPrice = await _predictionService.PredictAsync(input);

                // SADECE tahmin edilen fiyat değerini döndür
                return Ok(new { predictedPrice });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Tahmin işlemi sırasında hata oluştu");
                return StatusCode(500, $"Tahmin işlemi sırasında bir hata oluştu: {ex.Message}");
            }
        }
    }
}
