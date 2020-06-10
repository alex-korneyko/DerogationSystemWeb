using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<IActionResult> Login(LoginRequestModel requestModel)
        {
            User userFromDb = _context.Users.FirstOrDefault(user => user.DerogationUser == requestModel.Username);

            if (userFromDb == null)
                return Ok(null);

            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, requestModel.Username)
            };
            var claimsIdentity = new ClaimsIdentity(claims, "AppCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

            return Ok(userFromDb);
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }

        [HttpGet("user")]
        public IActionResult GetAuthUser()
        {
            if (User.Identity.IsAuthenticated)
            {
                User authUser = _context.Users.FirstOrDefault(user => user.DerogationUser == User.Identity.Name);
                return Ok(authUser);
            }

            return Ok();
        }
    }
}