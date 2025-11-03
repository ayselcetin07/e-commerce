using ECommerce.Application.Interfaces;
using Microsoft.Extensions.Caching.Distributed;


namespace ECommerce.Infrastructure.Services;

public class RedisCacheService : ICacheService
{
    private readonly IDistributedCache _cache;

    public RedisCacheService(IDistributedCache cache)
    {
        _cache = cache;
    }

    public async Task InvalidateAsync(string key)
    {
        await _cache.RemoveAsync(key);
    }
}
