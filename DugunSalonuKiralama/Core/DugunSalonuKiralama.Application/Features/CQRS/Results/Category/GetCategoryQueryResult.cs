using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Results.Category
{
    public class GetCategoryQueryResult
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
    }
}
