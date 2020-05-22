﻿using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.Authentication;
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
                new Claim(ClaimTypes.Name, requestModel.Username)
            };
            var claimsIdentity = new ClaimsIdentity(claims, "Cookie");
            ClaimsPrincipal claimPrincipal = new ClaimsPrincipal(claimsIdentity);
            await HttpContext.SignInAsync("Cookie", claimPrincipal);

            return Ok(userFromDb);
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Cookie");

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