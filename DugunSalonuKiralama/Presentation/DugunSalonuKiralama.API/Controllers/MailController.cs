using DugunSalonuKiralama.Application.Features.CQRS.Commands.Mail;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Bookings;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace DugunSalonuKiralama.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly CreateMailCommandHandler _mailCommandHandler;

        public MailController(CreateMailCommandHandler mailCommandHandler)
        {
            _mailCommandHandler = mailCommandHandler;
        }
        [HttpPost]
        public async Task<IActionResult> CreateMail(CreateMailCommand createMailCommand)
        {
            try
            {
                await _mailCommandHandler.Handle(createMailCommand);
                return Ok("Rezervasyon başarılı.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
