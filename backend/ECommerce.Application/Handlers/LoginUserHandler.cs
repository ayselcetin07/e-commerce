using ECommerce.Application.Queries;
using ECommerce.Core.Interfaces;
using ECommerce.Core.Services;
using MediatR;

namespace ECommerce.Application.Handlers;

public class LoginUserHandler : IRequestHandler<LoginUserQuery, string>
{
    private readonly IUserRepository _repo;
    private readonly IJwtProvider _jwt;

    public LoginUserHandler(IUserRepository repo, IJwtProvider jwt)
    {
        _repo = repo;
        _jwt = jwt;
    }

    public async Task<string> Handle(LoginUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _repo.GetByEmailAsync(request.Email);
        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new Exception("Invalid credentials");

        return _jwt.GenerateToken(user);
    }
}
