using ECommerce.Application.DTOs;
using MediatR;

namespace ECommerce.Application.Queries;

public class GetAllProductsQuery : IRequest<List<ProductDto>> { }
