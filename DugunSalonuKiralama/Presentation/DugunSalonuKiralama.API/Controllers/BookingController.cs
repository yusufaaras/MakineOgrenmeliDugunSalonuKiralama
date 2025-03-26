using DugunSalonuKiralama.Application.Features.CQRS.Commands.Booking;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Bookings;
using DugunSalonuKiralama.Application.Features.CQRS.Queries.Booking;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DugunSalonuKiralama.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly CreateBookingCommandHandler _createBookingCommandHandler;
        private readonly UpdateBookingCommandHandler _updateBookingCommandHandler;
        private readonly RemoveBookingCommandHandler _removeBookingCommandHandler;
        private readonly GetBookingByIdQueryHandler _getBookingByIdQueryHandler;
        private readonly GetBookingQueryHandler _getBookingQueryHandler;

        public BookingController(CreateBookingCommandHandler createBookingCommandHandler, UpdateBookingCommandHandler 
            updateBookingCommandHandler, RemoveBookingCommandHandler removeBookingCommandHandler, GetBookingByIdQueryHandler getBookingByIdQueryHandler, GetBookingQueryHandler getBookingQueryHandler)
        {
            _createBookingCommandHandler = createBookingCommandHandler;
            _updateBookingCommandHandler = updateBookingCommandHandler;
            _removeBookingCommandHandler = removeBookingCommandHandler;
            _getBookingByIdQueryHandler = getBookingByIdQueryHandler;
            _getBookingQueryHandler = getBookingQueryHandler;
        }
        [HttpGet]
        public async Task<IActionResult> BookingList()
        {
            var values = await _getBookingQueryHandler.Handle();
            return Ok(values);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var value = await _getBookingByIdQueryHandler.Handle(new GetBookingByIdQuery(id));
            return Ok(value);

        }
        [HttpPost]
        public async Task<IActionResult> CreateBooking(CreateBookingCommand command)
        {
            await _createBookingCommandHandler.Handle(command);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveBooking(int id)
        {
            await _removeBookingCommandHandler.Handle(new RemoveBookingCommand(id));
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> UpdateBooking(UpdateBookingCommand command)
        {
            await _updateBookingCommandHandler.Handle(command);
            return Ok();
        }
    }
}
