using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Commands.Wedding
{
    public class CreateWeddingHallCommand
    {
        public string Name { get; set; }
        public int Capacity { get; set; }
        public int LocationId { get; set; }
    }
}
