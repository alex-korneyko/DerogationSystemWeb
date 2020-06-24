using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Route("/api")]
    public class CommonApiController : Controller
    {
        private readonly IWebHostEnvironment _environment;

        public CommonApiController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpGet]
        public IActionResult MainTest()
        {
            return Ok("Hello World!!!");
        }

        [HttpGet("IsDevelopment")]
        public bool IsDevelopment()
        {
            return _environment.IsDevelopment();
        }
    }
}