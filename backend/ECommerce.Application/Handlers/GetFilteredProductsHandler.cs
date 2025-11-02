using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using ECommerce.Application.Queries;
using MediatR;

namespace ECommerce.Application.Handlers;

public class GetFilteredProductsHandler : IRequestHandler<GetFilteredProductsQuery, List<ProductDto>>
{
    private readonly IProductRepository _repo;

    public GetFilteredProductsHandler(IProductRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<ProductDto>> Handle(GetFilteredProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _repo.GetAllAsync();

        if (!string.IsNullOrWhiteSpace(request.Category))
            products = products.Where(p => p.Category == request.Category).ToList();

        if (request.MinPrice.HasValue)
            products = products.Where(p => p.Price >= request.MinPrice.Value).ToList();

        if (request.MaxPrice.HasValue)
            products = products.Where(p => p.Price <= request.MaxPrice.Value).ToList();

        if (request.Sort == "asc")
            products = products.OrderBy(p => p.Price).ToList();
        else if (request.Sort == "desc")
            products = products.OrderByDescending(p => p.Price).ToList();

        return products.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            ImageUrl = p.ImageUrl,
            Category = p.Category,
            Description = p.Description
        }).ToList();
    }
}
