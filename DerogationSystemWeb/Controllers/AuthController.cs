using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly ApplicationContext _context;

        public AuthController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            User userFromDb = _context.Users.FirstOrDefault(user => user.DerogationUser == model.Username);

            if (userFromDb == null)
            {
                return Ok("User not found");
            }

            var claims = new List<Claim>
            {
                new Claim("Demo", "Demo")
            };
            var claimsIdentity = new ClaimsIdentity(claims, "Cookie");
            ClaimsPrincipal claimPrincipal = new ClaimsPrincipal(claimsIdentity);
            await HttpContext.SignInAsync("Cookie", claimPrincipal);

            return Ok();
        }
    }
}