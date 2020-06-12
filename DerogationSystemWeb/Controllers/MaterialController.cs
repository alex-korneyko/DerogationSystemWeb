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
        public async Task<IActionResult> GetMaterials()
        {
            var nowMinusOneYear = DateTime.Now.AddMonths(-2);

            var materials = await _db.Materials
                .Where(material => material.CreateDate > nowMinusOneYear)
                .ToListAsync();

            materials.Sort((m1, m2) => m1.CreateDate < m2.CreateDate ? 1 : -1);

            return Ok(materials);
        }

        [HttpPost("byMask")]
        public async Task<IActionResult> GetByMask(string mask)
        {
            if (mask == null)
            {
                return RedirectToAction("GetMaterials");
            }
            if (mask.Length < 3)
            {
                return Ok(new List<Material>());
            }

            var byMask = await _db.Materials.Where(material => material.PartNo.Contains(mask)).ToListAsync();
            byMask.AddRange( await _db.Materials.Where(material => material.Description.Contains(mask)).ToListAsync());

            if (byMask.Count > 200)
            {
                byMask = byMask.Where(material => material.CreateDate > DateTime.Now.AddMonths(-2)).ToList();
            }

            return Ok(byMask);
        }
    }
}