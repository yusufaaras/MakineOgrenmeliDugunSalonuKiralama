using DugunSalonuKiralama.Application.Features.Mediator.Queries.AppUserQueries;
using DugunSalonuKiralama.Application.Tools;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DugunSalonuKiralama.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public LoginsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CheckAppUserQuery(GetCheckAppUserQuery query)
        {
            var values = await _mediator.Send(query);
            if (values.IsExits) 
            {
                return Created("", JwtTokenGenerator.GenerateToken(values));
            }
            else
            {
                return BadRequest("DugunSalonuKiralama Adı Veya Şifre Hatalıdır");
            }
        }
    }
}
