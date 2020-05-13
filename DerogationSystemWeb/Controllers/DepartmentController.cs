using System.Collections.Generic;
using System.Linq;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.Mvc;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Route("api/departments")]
    public class DepartmentController : Controller
    {
        private readonly ApplicationContext _dataBase;

        public DepartmentController(ApplicationContext dataBase)
        {
            this._dataBase = dataBase;
        }

        [HttpGet]
        public IEnumerable<FactoryDepartment> GetAll()
        {
            var departments = _dataBase.Departments.ToList();

            return departments;
        }

        [HttpGet("{id}")]
        public FactoryDepartment GetDepartment(string id)
        {
            FactoryDepartment department = _dataBase.Departments.FirstOrDefault(dept => dept.Department.Equals(id));

            return department;
        }

        [HttpPost]
        public IActionResult AddDepartment(FactoryDepartment department)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _dataBase.Departments.Add(department);
            _dataBase.SaveChanges();
            
            return Ok(department);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(string id, FactoryDepartment department)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id.Equals(department.Department))
            {
                _dataBase.Departments.Update(department);
                _dataBase.SaveChanges();
                return Ok(department);
            }

            _dataBase.Departments.Add(department);
            _dataBase.SaveChanges();

            List<User> departmentUsers = _dataBase.Users.Where(user => user.Department.Equals(id)).ToList();
            departmentUsers.ForEach(user => user.Department = department.Department);
            _dataBase.Users.UpdateRange(departmentUsers);
            _dataBase.SaveChanges();

            FactoryDepartment deptForDelete = _dataBase.Departments.FirstOrDefault(dept => dept.Department == id);
            if (deptForDelete != null)
                _dataBase.Departments.Remove(deptForDelete);
            _dataBase.SaveChanges();

            return Ok(department);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(string id)
        {
            FactoryDepartment department = _dataBase.Departments.FirstOrDefault(dept => dept.Department.Equals(id));
            if (department == null)
                return Ok();

            _dataBase.Departments.Remove(department);
            _dataBase.SaveChanges();

            return Ok();
        }
    }
}