using ECommerce.Core.Entities;

namespace ECommerce.Application.Interfaces;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync();
}
