using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using DerogationSystemWeb.Model.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
            var userFromDb = _context.Users
                .Include(user => user.FactoryDepartment)
                .FirstOrDefault(user => user.DerogationUser == requestModel.Username);

            if (userFromDb == null)
                return BadRequest(new {message = "User not found!"});

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
                User authUser = _context.Users
                    .Include(user => user.FactoryDepartment)
                    .FirstOrDefault(user => user.DerogationUser == User.Identity.Name);
                return Ok(authUser);
            }

            return Ok();
        }

        [HttpPost("token")]
        public IActionResult Token(LoginRequestModel requestModel)
        {
            var userFromDb = _context.Users
                .Include(user => user.FactoryDepartment)
                .FirstOrDefault(user => user.DerogationUser == requestModel.Username);
            if (userFromDb == null)
            {
                return BadRequest(new {error = "Username or password incorrect"});
            }

            var checkLdapResult = 
                AuxiliaryUtils.CheckLdapUser("TPVAOC", userFromDb.DerogationUser, requestModel.Password);

            if (!checkLdapResult)
            {
                return BadRequest(new {message = "LDAP check error"});
            }

            return Ok(GenerateToken(userFromDb));
        }

        [Authorize]
        [HttpGet("refreshToken")]
        public IActionResult RefreshToken()
        {
            var userFromDb = _context.Users.FirstOrDefault(user => user.DerogationUser == User.Identity.Name);

            if (userFromDb == null)
            {
                return BadRequest(new {error = "Token refresh failed"});
            }

            return Ok(GenerateToken(userFromDb));
        }

        private object GenerateToken(User user)
        {
            var identity = GetIdentity(user.DerogationUser);

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new {token, user};
        }

        private ClaimsIdentity GetIdentity(string username)
        {
            var claims = new List<Claim> {new Claim(ClaimsIdentity.DefaultNameClaimType, username)};

            var claimsIdentity = new ClaimsIdentity(claims, "TOKEN", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }
    }
}