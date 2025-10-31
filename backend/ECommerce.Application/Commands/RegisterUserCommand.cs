using MediatR;

namespace ECommerce.Application.Commands;

public record RegisterUserCommand(string Email, string Password, string Role = "Customer") : IRequest<string>;

