using Microsoft.AspNetCore.Mvc;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Route("/api")]
    public class TestApiController : Controller
    {
        [HttpGet]
        public IActionResult mainTest()
        {
            return Ok("Hello World!!!");
        }
    }
}