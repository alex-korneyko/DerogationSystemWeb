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
        public  IEnumerable<WorkOrder> GetAllWorkOrders()
        {
            // var workOrder = _db.WorkOrders.Include(wo => wo.Material).FirstOrDefault(wo => wo.WorkOrderId == 313687);

            var nowMinus30Days = DateTime.Now.AddDays(-30);

            var workOrders = _db.WorkOrders.Include(wo => wo.Material).Where(wo => wo.OrderDate > nowMinus30Days).ToList();
            workOrders.Sort((wo1, wo2) =>
            {
                if (wo1.OrderDate < wo2.OrderDate)
                {
                    return 1;
                }

                if (wo1.OrderDate > wo2.OrderDate)
                {
                    return -1;
                }

                return 0;
            });
            return workOrders;
        }
    }
}