using ECommerce.Application.Commands;
using ECommerce.Application.Interfaces;
using ECommerce.Core.Entities;
using MediatR;

namespace ECommerce.Application.Handlers;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, Guid>
{
    private readonly IProductRepository _repo;
    private readonly ICacheService _cache;

    public CreateProductHandler(IProductRepository repo, ICacheService cache)
    {
        _repo = repo;
        _cache = cache;
    }

    public async Task<Guid> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Price = request.Price,
            ImageUrl = request.ImageUrl,
            Category = request.Category,
            Description = request.Description
        };

        await _repo.AddAsync(product);
        await _cache.InvalidateAsync("products");

        return product.Id;
    }
}
