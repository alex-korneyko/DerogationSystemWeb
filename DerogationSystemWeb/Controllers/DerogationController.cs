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
            if (requestModel.ToDate != null) requestModel.ToDate = requestModel.ToDate.AddDays(1);
            var authUser = _database.Users.First(usr => usr.DerogationUser == this.User.Identity.Name);

            var filteredList = _derogationService.GetFilteredList(requestModel, authUser);

            return filteredList;
        }

        [HttpGet("getOne/{id}")]
        public async Task<DerogationHeader> GetOne(long id)
        {
            var derogationHeader = await _database.DerogationHeaders
                .Include(dh => dh.Author)
                .Include(dh => dh.FactoryDepartment)
                .Include(dh => dh.DerogationDepartments)
                .Include(dh => dh.DerogationItems)
                .FirstOrDefaultAsync(dh => dh.DerogationId == id);

            return derogationHeader;
        }

        [HttpPost("approveDerogation/{id}")]
        public IActionResult ApproveDerogation(long id, ApprovalRequestModel requestModel)
        {
            User authUser;

            if (requestModel.UserId == 0)
            {
                authUser = _database.Users.First(usr => usr.DerogationUser == this.User.Identity.Name);
            }
            else
            {
                authUser = _database.Users
                    .Include(user => user.FactoryDepartment)
                    .First(user => user.Id == requestModel.UserId);
            }
            var derogation = _database.DerogationHeaders
                .Include(dh => dh.Author)
                .Include(dh => dh.FactoryDepartment)
                .Include(dh => dh.DerogationDepartments)
                .Include(dh => dh.DerogationItems)
                .First(derg => derg.DerogationId == id);

            if (authUser == null || derogation == null) return Ok();

            var nextDeptsForApproval = _derogationService.GetNextDeptsForApproval(derogation);

            if (!nextDeptsForApproval.Contains(authUser.FactoryDepartment)) return Ok();

            var derogationDepartment = derogation.DerogationDepartments.Find(dDept => dDept.Department == authUser.Department);

            derogationDepartment.Comment = requestModel.Comment;
            derogationDepartment.DerogationUser = authUser.DerogationUser;
            derogationDepartment.OperationDate = DateTime.Now;

            if (requestModel.ApproveValue == "approve")
            {
                derogationDepartment.Approved = '1';
                derogationDepartment.Training = requestModel.NeedTraining ? '1' : '0';
            }

            derogationDepartment.Rejected = '1';

            _database.SaveChanges();
            return Ok(derogation);
        }
    }
}