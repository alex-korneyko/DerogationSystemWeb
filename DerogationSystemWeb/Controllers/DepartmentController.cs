using System.Collections;
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
        public IEnumerable<Department> Get()
        {
            var departments = _dataBase.Departments.ToList();

            return departments;
        }
    }
}