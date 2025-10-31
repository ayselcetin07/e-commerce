using ECommerce.Application.Commands;
using ECommerce.Core.Entities;
using ECommerce.Core.Interfaces;
using ECommerce.Core.Services;
using MediatR;

namespace ECommerce.Application.Handlers;

public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, string>
{
    private readonly IUserRepository _repo;
    private readonly IJwtProvider _jwt;

    public RegisterUserHandler(IUserRepository repo, IJwtProvider jwt)
    {
        _repo = repo;
        _jwt = jwt;
    }

    public async Task<string> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var existing = await _repo.GetByEmailAsync(request.Email);
        if (existing != null)
            throw new Exception("User already exists");

        var hash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            PasswordHash = hash,
            Role = request.Role //  Rol bilgisi burada ekleniyor
        };

        await _repo.AddAsync(user);

        return _jwt.GenerateToken(user);
    }
}
