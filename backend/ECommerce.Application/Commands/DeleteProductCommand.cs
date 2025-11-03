using MediatR;

namespace ECommerce.Application.Commands;

public class DeleteProductCommand : IRequest
{
    public Guid Id { get; set; }
}
