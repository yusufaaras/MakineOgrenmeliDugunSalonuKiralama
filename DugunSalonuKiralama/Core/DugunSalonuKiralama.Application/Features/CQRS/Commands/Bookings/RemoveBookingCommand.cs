using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Commands.Booking
{
    public class RemoveBookingCommand
    {
        public RemoveBookingCommand(int id) 
        { 
            Id = id;
        }
        public int Id { get; set; }
    }
}
