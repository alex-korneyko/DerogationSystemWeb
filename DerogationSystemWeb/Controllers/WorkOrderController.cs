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
    [Route("api/workOrders")]
    public class WorkOrderController : Controller
    {
        private readonly ApplicationContext _db;

        public WorkOrderController(ApplicationContext db)
        {
            _db = db;
        }

        [HttpGet]
        public  IActionResult GetAllWorkOrders()
        {
            var nowMinus30Days = DateTime.Now.AddDays(-30);

            var workOrders = _db.WorkOrders
                .Include(wo => wo.Material)
                .Where(wo => wo.OrderDate > nowMinus30Days)
                .ToList();

            workOrders.ForEach(wo =>
            {
                wo.OrderNo = wo.OrderNo.Trim(' ');
                wo.SkdPartNo = wo.SkdPartNo.Trim(' ');
            });

            workOrders.Sort((wo1, wo2) =>
            {
                if (wo1.OrderDate < wo2.OrderDate)
                    return 1;

                if (wo1.OrderDate > wo2.OrderDate)
                    return -1;

                return 0;
            });

            var trimmed = workOrders.Select(wo =>
            {
                wo.OrderNo = wo.OrderNo.Trim();
                return wo;
            }).ToList();

            return Ok(trimmed);
        }

        [HttpPost("byMask")]
        public async Task<IActionResult> GetByMask(string mask)
        {
            if (string.IsNullOrEmpty(mask) || mask == "null")
            {
                return RedirectToAction("GetAllWorkOrders");
            }

            if (mask.Length < 3)
            {
                return Ok(new List<WorkOrder>());
            }

            var byMask = await _db.WorkOrders.Include(wo => wo.Material)
                .Where(wo => wo.OrderNo.Contains(mask))
                .ToListAsync();

            byMask.AddRange(await _db.WorkOrders.Include(wo => wo.Material)
                .Where(wo => wo.SkdPartNo.Contains(mask))
                .ToListAsync());

            byMask.AddRange(await _db.WorkOrders.Include(wo => wo.Material)
                .Where(wo => wo.Material.Description.Contains(mask))
                .ToListAsync());

            var trimmed = byMask.Select(wo =>
            {
                wo.OrderNo = wo.OrderNo.Trim();
                return wo;
            }).ToList();

            if (trimmed.Count > 200)
            {
                trimmed = trimmed.Where(wo => wo.OrderDate > DateTime.Now.AddDays(-30)).ToList();
            }

            return Ok(trimmed);
        }
    }
}