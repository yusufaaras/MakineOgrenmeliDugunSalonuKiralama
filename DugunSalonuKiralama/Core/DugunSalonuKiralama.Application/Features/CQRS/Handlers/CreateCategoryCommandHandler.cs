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
    public class CreateCategoryCommandHandler
    {
        private IRepository<Category> _repository;

        public CreateCategoryCommandHandler(IRepository<Category> repository)
        {
            _repository = repository;
        }

        public async Task Handle(CreateCategoryCommand command)
        {
            await _repository.CreateAsync(new Category
            {
                Name = command.Name
            });
        }
    }
}
