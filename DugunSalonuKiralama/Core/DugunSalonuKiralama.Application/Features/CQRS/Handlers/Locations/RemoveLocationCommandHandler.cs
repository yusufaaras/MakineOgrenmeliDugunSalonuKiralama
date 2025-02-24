using DugunSalonuKiralama.Application.Features.CQRS.Commands.Locations;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers.Locations
{
    public class RemoveLocationCommandHandler
    {
        private IRepository<Location> _repository;

        public RemoveLocationCommandHandler(IRepository<Location> repository)
        {
            _repository = repository;
        }

        public async Task Handle(RemoveLocationCommamd comment)
        {
            var value = await _repository.GetByIdAsync(comment.Id);
            await _repository.RemoveAsync(value);
        }

    }
}
