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
        public IEnumerable<User> GetAll()
        {
            List<User> users = _dataBase.Users.Include(u => u.FactoryDepartment).ToList();

            return users;
        }

        [HttpGet("{id}")]
        public User GetUser(int id)
        {
            User user = _dataBase.Users.Include(u => u.FactoryDepartment).FirstOrDefault(usr => usr.Id == id);

            return user;
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _dataBase.Users.Add(user);
            _dataBase.SaveChanges();

            return Ok(user);
        }

        [HttpPut]
        public IActionResult UpdateUser(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _dataBase.Users.Update(user);
            _dataBase.SaveChanges();

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            User user = _dataBase.Users.FirstOrDefault(usr => usr.Id == id);
            if (user == null) return Ok();

            _dataBase.Users.Remove(user);
            _dataBase.SaveChanges();

            return Ok();
        }
    }
}