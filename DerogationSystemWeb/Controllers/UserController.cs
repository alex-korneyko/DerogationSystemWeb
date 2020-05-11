using System.Collections;
using System.Collections.Generic;
using System.Linq;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly ApplicationContext _dataBase;

        public UserController(ApplicationContext dataBase)
        {
            _dataBase = dataBase;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            List<User> users = _dataBase.Users.Include(u => u.FactoryDepartment).ToList();

            return users;
        }
    }
}