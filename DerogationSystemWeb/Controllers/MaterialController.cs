using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/materials")]
    public class MaterialController : Controller
    {
        private readonly ApplicationContext _db;

        public MaterialController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IEnumerable<Material>> GetMaterials()
        {
            var nowMinusOneYear = DateTime.Now.AddYears(-1);

            var materials = await _db.Materials
                .Where(material => material.CreateDate > nowMinusOneYear)
                .ToListAsync();

            materials.Sort((m1, m2) => m1.CreateDate < m2.CreateDate ? 1 : -1);

            return materials;
        }
    }
}