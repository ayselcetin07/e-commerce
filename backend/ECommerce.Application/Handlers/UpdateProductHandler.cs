using ECommerce.Application.Commands;
using ECommerce.Application.Interfaces;

using MediatR;

namespace ECommerce.Application.Handlers;

public class UpdateProductHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IProductRepository _repo;
    private readonly ICacheService _cache;

    public UpdateProductHandler(IProductRepository repo, ICacheService cache)
    {
        _repo = repo;
        _cache = cache;
    }

    public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _repo.GetByIdAsync(request.Id);
        if (product is null)
            throw new Exception("Product not found");

        product.Name = request.Name;
        product.Price = request.Price;
        product.ImageUrl = request.ImageUrl;
        product.Category = request.Category;
        product.Description = request.Description;

        await _repo.UpdateAsync(product);
        await _cache.InvalidateAsync("products");

        return Unit.Value;
    }
}
