using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Commands.Category
{
    public class CreateCategoryCommand
    {
        public string Name { get; set; }
    }
}
