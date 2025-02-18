using DugunSalonuKiralama.Application.Features.CQRS.Commands.Category;
using DugunSalonuKiralama.Application.Features.CQRS.Commands.Wedding;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.GetWeddingHallWithLocationQueryHandler;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Wedding;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Weddings;
using DugunSalonuKiralama.Application.Features.CQRS.Queries.WeddingHall;
using DugunSalonuKiralama.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DugunSalonuKiralama.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeddingHallController:ControllerBase
    {
        private readonly GetWeddingHallQueryHandler _getWeddingHallQueryHandler;
        private readonly GetWeddingHallByIdQueryHandler _getWeddingHallByIdQueryHandler;
        private readonly CreateWeddingHallCommandHandler _createWeddingHallCommandHandler;
        private readonly UpdateWeddingHallCommandHandler _updateWeddingHallCommandHandler;
        private readonly RemoveWeddingHallCommandHandler _removeWeddingHallCommandHandler;
        private readonly GetWeddingHallWithLocationQueryHandler _getWeddingHallWithLocationQueryHandler;

        public WeddingHallController(GetWeddingHallQueryHandler getWeddingHallQueryHandler, GetWeddingHallByIdQueryHandler getWeddingHallByIdQueryHandler, CreateWeddingHallCommandHandler createWeddingHallCommandHandler, UpdateWeddingHallCommandHandler updateWeddingHallCommandHandler, RemoveWeddingHallCommandHandler removeWeddingHallCommandHandler, GetWeddingHallWithLocationQueryHandler getWeddingHallWithLocationQueryHandler)
        {
            _getWeddingHallQueryHandler = getWeddingHallQueryHandler;
            _getWeddingHallByIdQueryHandler = getWeddingHallByIdQueryHandler;
            _createWeddingHallCommandHandler = createWeddingHallCommandHandler;
            _updateWeddingHallCommandHandler = updateWeddingHallCommandHandler;
            _removeWeddingHallCommandHandler = removeWeddingHallCommandHandler;
            _getWeddingHallWithLocationQueryHandler = getWeddingHallWithLocationQueryHandler;
        }
        [HttpGet]
        public async Task<IActionResult> WeddingHallList()
        {
            var values = await _getWeddingHallQueryHandler.Handle();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWeddingHall(int id)
        {
            var value = await _getWeddingHallByIdQueryHandler.Handle(new GetWeddingHallByIdQuery(id));
            return Ok(value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWeddingHall(CreateWeddingHallCommand command)
        {
            await _createWeddingHallCommandHandler.Handle(command);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveWeddingHall(int id)
        {
            await _removeWeddingHallCommandHandler.Handle(new RemoveWeddingHallCommand(id));
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateWeddingHall(UpdateWeddingHallCommand command)
        {
            await _updateWeddingHallCommandHandler.Handle(command);
            return Ok();
        }
        [HttpGet("GetWeddingHallWithLocation")]
        public async Task<IActionResult> GetWeddingHallWithLocation()
        {
            var values = await _getWeddingHallWithLocationQueryHandler.Handle();
            return Ok(values);
        }
    }
}
