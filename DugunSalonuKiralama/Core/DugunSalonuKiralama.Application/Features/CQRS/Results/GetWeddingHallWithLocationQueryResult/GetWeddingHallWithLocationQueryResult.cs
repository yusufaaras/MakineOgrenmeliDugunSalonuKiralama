﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Results.GetWeddingHallWithLocationQueryResult
{
    public class GetWeddingHallWithLocationQueryResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int Capacity { get; set; }
        public int LocationId { get; set; }
    }
}
