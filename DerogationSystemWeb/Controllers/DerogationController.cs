using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DerogationSystemWeb.Controllers.RequestModel;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using DerogationSystemWeb.Model.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/derogations")]
    public class DerogationController : Controller
    {
        private readonly ApplicationContext _database;
        private readonly DerogationService _derogationService;

        public DerogationController(ApplicationContext database, DerogationService derogationService)
        {
            _database = database;
            _derogationService = derogationService;
        }

        [HttpGet]
        public IEnumerable<DerogationHeader> GetAll()
        {
            var derogationHeaders = _database.DerogationHeaders.Include(dHeader => dHeader.Author).ToList();

            return derogationHeaders;
        }

        [HttpPost("getLast")]
        public IEnumerable<DerogationHeader> GetLast(DerogationListRequestModel requestModel)
        {
            var authUser = _database.Users.First(usr => usr.DerogationUser == this.User.Identity.Name);

            var filteredList = _derogationService.GetFilteredList(requestModel, authUser);

            filteredList.Reverse();

            return filteredList;
        }

        [HttpGet("getOne/{id}")]
        public async Task<DerogationHeader> getOne(long id)
        {
            var derogationHeader = await _database.DerogationHeaders
                .Include(dh => dh.Author)
                .Include(dh => dh.FactoryDepartment)
                .Include(dh => dh.DerogationDepartments)
                .FirstOrDefaultAsync(dh => dh.DerogationId == id);

            return derogationHeader;
        }
    }
}