﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DugunSalonuKiralama.Application.Tools
{
    public class JwtTokenDefaults
    {
        public const string ValidAudience = "https//localhost";
        public const string ValidIssuer = "https//localhost";
        public const string Key = "DugunSalonuKiralama+*010203CARBOOK01+*..020304CarBookProje";
        public const int Expire = 5;      
    }
}