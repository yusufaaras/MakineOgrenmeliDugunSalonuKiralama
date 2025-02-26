﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Features.CQRS.Commands.Locations
{
    public class CreateLocationCommand
    {
        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
    }
}
