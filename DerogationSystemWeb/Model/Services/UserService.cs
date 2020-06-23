using System.Collections.Generic;
using System.Linq;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Model.Services
{
    public class UserService
    {
        private readonly ApplicationContext _db;

        public UserService(ApplicationContext db)
        {
            _db = db;
        }

        public User GetUserByName(string username)
        {
            return _db.Users
                .Include(user => user.FactoryDepartment)
                .First(usr => usr.DerogationUser == username);
        }

        public List<User> GetAll()
        {
            var users = _db.Users.ToList();

            return users;
        }
    }
}