using DugunSalonuKiralama.Application.Features.CQRS.Commands.Booking;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Bookings
{
    public class RemoveBookingCommandHandler
    {
        private IRepository<Booking> _repository;
        public RemoveBookingCommandHandler(IRepository<Booking> repository)
        {
            _repository = repository;
        }
        public async Task Handle(RemoveBookingCommand command)
        {
            var value = await _repository.GetByIdAsync(command.Id);
            await _repository.RemoveAsync(value);

        }
    }
}
