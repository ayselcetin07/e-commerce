using ECommerce.Application.Commands;
using ECommerce.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/Auth")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
    {
        var token = await _mediator.Send(command);
        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserQuery query)
    {
        var token = await _mediator.Send(query);
        return Ok(new { token });
    }
}
