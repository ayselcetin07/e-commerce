using ECommerce.Application.DTOs;
using MediatR;

namespace ECommerce.Application.Queries;

public class GetProductByIdQuery : IRequest<ProductDto?>
{
    public Guid Id { get; set; }
}
