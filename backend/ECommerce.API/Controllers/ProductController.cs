using ECommerce.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? category,
        [FromQuery] decimal? minPrice,
        [FromQuery] decimal? maxPrice,
        [FromQuery] string? sort)
    {
        var query = new GetFilteredProductsQuery
        {
            Category = category,
            MinPrice = minPrice,
            MaxPrice = maxPrice,
            Sort = sort
        };

        var products = await _mediator.Send(query);
        return Ok(products);
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _mediator.Send(new GetProductByIdQuery { Id = id });
        return product != null ? Ok(product) : NotFound();
    }
}
