using ECommerce.Core.Entities;

namespace ECommerce.Application.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<List<string>> GetCategoriesAsync();
        Task<Product?> GetByIdAsync(Guid id);
        Task UpdateAsync(Product product);
        Task DeleteAsync(Guid id);
        Task AddAsync(Product product);

    }

}
