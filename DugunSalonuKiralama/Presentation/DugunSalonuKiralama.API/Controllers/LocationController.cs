using DugunSalonuKiralama.Application.Features.CQRS.Commands.Locations;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Locations;
using DugunSalonuKiralama.Application.Features.CQRS.Queries.Category;
using DugunSalonuKiralama.Application.Features.CQRS.Queries.Locations;
using Microsoft.AspNetCore.Mvc;

namespace DugunSalonuKiralama.API.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly GetLocationByIdQueryHandler _getLocationByIdQueryHandler;
        private readonly GetLocationQueryHandler _getLocationQueryHandler;
        private readonly CreateLocationCommandHandler _createLocationCommandHandler;
        private readonly RemoveLocationCommandHandler  _removeLocationCommandHandler;
        private readonly UpdateLocationCommandHandler _updateLocationCommandHandler;

        public LocationController(GetLocationByIdQueryHandler getLocationByIdQueryHandler, GetLocationQueryHandler getLocationQueryHandler, CreateLocationCommandHandler createLocationCommandHandler,
           RemoveLocationCommandHandler removeLocationCommandHandler, UpdateLocationCommandHandler updateLocationCommandHandler)
        {
            _getLocationByIdQueryHandler = getLocationByIdQueryHandler;
            _getLocationQueryHandler = getLocationQueryHandler;
            _createLocationCommandHandler = createLocationCommandHandler;
            _updateLocationCommandHandler = updateLocationCommandHandler;
            _removeLocationCommandHandler = removeLocationCommandHandler;

        }
        [HttpGet]
        public async Task<IActionResult> LocationList()
        {
            var values = await _getLocationQueryHandler.Handle();
            return Ok(values);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            var value = await _getLocationByIdQueryHandler.Handle(new GetLocationByIdQuery(id));
            return Ok(value);
        }
        [HttpPost]
        public async Task<IActionResult> CreateLocation(CreateLocationCommand command) 
        {
            await _createLocationCommandHandler.Handle(command);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveLocation(int id)
        {
            await _removeLocationCommandHandler.Handle(new RemoveLocationCommamd(id));
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> UpdateLocation(UpdateLocationCommand command)
        {
            await _updateLocationCommandHandler.Handle(command);
            return Ok();
        }  

    }
}
