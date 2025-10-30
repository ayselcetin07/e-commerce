using MediatR;

namespace ECommerce.Application.Queries;

public record LoginUserQuery(string Email, string Password) : IRequest<string>;
