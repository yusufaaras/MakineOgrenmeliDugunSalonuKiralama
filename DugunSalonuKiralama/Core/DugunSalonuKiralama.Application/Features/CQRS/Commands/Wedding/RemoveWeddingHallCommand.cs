using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Commands.Wedding
{
    public class RemoveWeddingHallCommand
    {
        public RemoveWeddingHallCommand(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }

}