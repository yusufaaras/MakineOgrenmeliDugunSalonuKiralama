using DugunSalonuKiralama.Application.Features.CQRS.Commands.Booking;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Bookings;
using DugunSalonuKiralama.Application.Features.CQRS.Queries.Booking;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DugunSalonuKiralama.API.Controllers
{
    public class BookingController
    {
        private readonly CreateBookingCommandHandler _createBookingCommandHandler;
        private readonly UpdateBookingCommandHandler _updateBookingCommandHandler;
        private readonly RemoveBookingCommandHandler _removeBookingCommandHandler;
        private readonly GetBookingByIdQueryHandler _getBookingByIdQueryHandler;

        public BookingController(CreateBookingCommandHandler createBookingCommandHandler, UpdateBookingCommandHandler 
            updateBookingCommandHandler, RemoveBookingCommandHandler removeBookingCommandHandler, GetBookingByIdQueryHandler getBookingByIdQueryHandler)
        {
            _createBookingCommandHandler = createBookingCommandHandler;
            _updateBookingCommandHandler = updateBookingCommandHandler;
            _removeBookingCommandHandler = removeBookingCommandHandler;
            _getBookingByIdQueryHandler = getBookingByIdQueryHandler;
        }
        //[HttpGet]
        //public async Task<IActionResult> BookingList()
        //{
            
        //}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var value = await _getBookingByIdQueryHandler.Handle(new GetBookingByIdQuery(id));
            return 

        }
        [HttpPost]
        public async Task<IActionResult> CreateBooking(CreateBookingCommand command)
        {
            await _createBookingCommandHandler.Handle(command);
            return 
        }
    }
}
