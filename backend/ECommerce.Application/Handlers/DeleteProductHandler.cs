using ECommerce.Application.Commands;
using ECommerce.Application.Interfaces;
using MediatR;

namespace ECommerce.Application.Handlers;

public class DeleteProductHandler : IRequestHandler<DeleteProductCommand>
{
    private readonly IProductRepository _repo;
    private readonly ICacheService _cache;

    public DeleteProductHandler(IProductRepository repo, ICacheService cache)
    {
        _repo = repo;
        _cache = cache;
    }

    public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        await _repo.DeleteAsync(request.Id);
        await _cache.InvalidateAsync("products");

        return Unit.Value;
    }
}
