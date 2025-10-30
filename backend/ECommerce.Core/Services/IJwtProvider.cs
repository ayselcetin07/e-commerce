using ECommerce.Core.Entities;

namespace ECommerce.Core.Services;

public interface IJwtProvider
{
    string GenerateToken(User user);
}
