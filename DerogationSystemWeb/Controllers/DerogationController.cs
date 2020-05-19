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
            var derogationHeaders = _database.DerogationHeaders.Include(dHeader => dHeader.Author).ToList();

            return derogationHeaders;
        }

        [HttpGet("getLast/{count}")]
        public IEnumerable<DerogationHeader> GetLast(int count)
        {
            var derogationHeaders = _database.DerogationHeaders
                .Include(dHeader => dHeader.Author)
                .Include(dHeader => dHeader.FactoryDepartment)
                .ToList();

            if (count == 0 || derogationHeaders.Count == 0)
                return new List<DerogationHeader>();

            if (count > derogationHeaders.Count)
                count = derogationHeaders.Count;

            var last = derogationHeaders.GetRange(derogationHeaders.Count - count, count);

            return last;
        }

        [HttpGet("getOne/{id}")]
        public async Task<DerogationHeader> getOne(long id)
        {
            var derogationHeader = await _database.DerogationHeaders
                .Include(dh => dh.Author)
                .Include(dh => dh.FactoryDepartment)
                .Include(dh => dh.DerogationDepartments)
                .FirstOrDefaultAsync(dh => dh.DerogationID == id);

            return derogationHeader;
        }
    }
}