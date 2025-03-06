using DugunSalonuKiralama.Application.Features.CQRS.Commands.User;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.BrandHandlers;
using DugunSalonuKiralama.Application.Features.CQRS.Handlers.User;
using DugunSalonuKiralama.Application.Features.CQRS.Queries.User;
using Microsoft.AspNetCore.Mvc;

namespace DugunSalonuKiralama.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly GetUserQueryHandler _getUserQueryHandler;
        private readonly UpdateUserCommandHandler _updateUserCommandHandler;
        private readonly RemoveUserCommandHandler _removeUserCommandHandler;
        private readonly GetUserByIdQueryHandler _getUserByIdQueryHandler;

        public UserController(GetUserQueryHandler getUserQueryHandler, UpdateUserCommandHandler updateUserCommandHandler, RemoveUserCommandHandler removeUserCommandHandler, GetUserByIdQueryHandler getUserByIdQueryHandler)
        {
            _getUserQueryHandler = getUserQueryHandler;
            _updateUserCommandHandler = updateUserCommandHandler;
            _removeUserCommandHandler = removeUserCommandHandler;
            _getUserByIdQueryHandler = getUserByIdQueryHandler;
        }

        [HttpGet]
        public async Task<IActionResult> CarList()
        {
            var values = await _getUserQueryHandler.Handle();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCar(int id)
        {
            var value = await _getUserByIdQueryHandler.Handle(new GetUserByIdQuery(id));
            return Ok(value);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveCar(int id)
        {
            await _removeUserCommandHandler.Handle(new RemoveUserCommand(id));
            return Ok("Kullanıcı Başarıyla Silindi");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateCar(UpdateUserCommand command)
        {
            await _updateUserCommandHandler.Handle(command);
            return Ok("Kullanıcı Başarıyla Güncellendi");
        }
    }
}

