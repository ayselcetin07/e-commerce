using MediatR;

namespace ECommerce.Application.Commands;

public class UpdateProductCommand : IRequest
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public required string ImageUrl { get; set; }
    public required string Category { get; set; }
    public required string Description { get; set; }
}
