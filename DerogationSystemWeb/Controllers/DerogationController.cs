using System.Collections.Generic;
using System.Linq;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/derogations")]
    public class DerogationController
    {
        private readonly ApplicationContext _database;

        public DerogationController(ApplicationContext database)
        {
            _database = database;
        }

        [HttpGet]
        public IEnumerable<DerogationHeader> GetAll()
        {
            List<DerogationHeader> derogationHeaders = _database.DerogationHeaders.Include(dHeader => dHeader.Author).ToList();

            return derogationHeaders.GetRange(0, 3);
        }

        [HttpGet("getLast/{count}")]
        public IEnumerable<DerogationHeader> GetLast(int count)
        {
            List<DerogationHeader> derogationHeaders = _database.DerogationHeaders
                .Include(dHeader => dHeader.Author).ToList();

            if (count == 0 || derogationHeaders.Count == 0)
                return new List<DerogationHeader>();

            if (count > derogationHeaders.Count)
                count = derogationHeaders.Count;

            return derogationHeaders.GetRange(derogationHeaders.Count - count, count);
        }
    }
}