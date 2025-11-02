using ECommerce.Application.DTOs;
using MediatR;

namespace ECommerce.Application.Queries;

public class GetFilteredProductsQuery : IRequest<List<ProductDto>>
{
    public string? Category { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public string? Sort { get; set; } // "asc" or "desc"
}
