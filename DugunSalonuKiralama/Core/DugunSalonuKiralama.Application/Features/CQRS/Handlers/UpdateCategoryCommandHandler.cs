using DugunSalonuKiralama.Application.Features.CQRS.Commands.Category;
using DugunSalonuKiralama.Application.Interfaces;
using DugunSalonuKiralama.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Handlers
{
    public class UpdateCategoryCommandHandler
    {
        private IRepository<Category> _repository;

        public UpdateCategoryCommandHandler(IRepository<Category> repository)
        {
            _repository = repository;
        }
        public async Task Handle(UpdateCategoryCommand command)
        {
            var values = await _repository.GetByIdAsync(command.CategoryId);
            values.Name = command.Name;
            await _repository.UpdateAsync(values);
        }
    }
}

