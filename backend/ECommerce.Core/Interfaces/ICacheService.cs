namespace ECommerce.Application.Interfaces;

public interface ICacheService
{
    Task InvalidateAsync(string key);
}
