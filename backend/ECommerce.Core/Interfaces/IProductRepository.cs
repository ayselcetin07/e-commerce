using ECommerce.Core.Entities;

namespace ECommerce.Application.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<List<string>> GetCategoriesAsync();
        Task<Product?> GetByIdAsync(Guid id);
    }
}
