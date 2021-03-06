﻿using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly UserService _userService;
        private readonly NotificationService _notificationService;

        public DerogationController(ApplicationContext database, DerogationService derogationService,
            UserService userService, NotificationService notificationService)
        {
            _database = database;
            _derogationService = derogationService;
            _userService = userService;
            _notificationService = notificationService;
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
            requestModel.ToDate = requestModel.ToDate.AddDays(1);
            var authUser = _database.Users.First(usr => usr.DerogationUser == this.User.Identity.Name);

            var filteredList = _derogationService.GetFilteredList(requestModel, authUser);

            return filteredList;
        }

        [HttpPost("getSet")]
        public IEnumerable<DerogationHeader> GetDerogationsSet(IEnumerable<long> derogationIds)
        {
            var derogationsSet = _derogationService.GetDerogationsSet(derogationIds);

            return derogationsSet;
        }

        [HttpGet("getOne/{id}")]
        public IActionResult GetOne(long id)
        {
            var derogationHeader = _derogationService.GetDerogation(id);

            return Ok(derogationHeader);
        }

        [HttpPost("approveDerogation/{id}")]
        public IActionResult ApproveDerogation(long id, ApprovalRequestModel requestModel)
        {
            var authUser = _userService.GetUserByName(this.User.Identity.Name);
            if (authUser != null && authUser.CanApprove == '0')
            {
                return BadRequest(new {message = "Action is not allowed!"});
            }
            
            var derogation = _derogationService.GetDerogation(id);
            if (authUser == null || derogation == null)
                return BadRequest();

            var nextDeptsForApproval = _derogationService.GetNextDeptsForApproval(derogation);
            if (!nextDeptsForApproval.Contains(authUser.FactoryDepartment))
                return BadRequest();

            _derogationService.ChangeDergDeptStatusByUser(derogation, authUser, requestModel);

            var dergDeptsWhichExpected = _derogationService.GetDerogationDepartmentsWhichExpected(derogation);

            var recipients = new List<User>();
            dergDeptsWhichExpected.ForEach(dergDept =>
            {
                var users = _database.Users.Where(user => user.Department == dergDept.Department).ToList();
                recipients.AddRange(users);
            });

            _notificationService.ApproveDerogation(derogation, recipients);

            return Ok(derogation);
        }

        [HttpPost("cancellationRequest/{id}")]
        public IActionResult CancellationRequest(long id, Dictionary<string, object> reason)
        {
            var authUser = _userService.GetUserByName(this.User.Identity.Name);
            if (authUser != null && authUser.CanApprove == '0')
            {
                return BadRequest(new {message = "Action is not allowed"});
            }
            
            var derogation = _derogationService.GetDerogation(id);
            if (authUser == null || derogation == null)
                return BadRequest();

            var nextDeptsForApproval = _derogationService.GetNextDeptsForApproval(derogation);
            if (!nextDeptsForApproval.Contains(authUser.FactoryDepartment))
                return BadRequest();

            _derogationService.CancellationRequest(derogation, authUser, reason["reason"].ToString());
            
            _notificationService.DerogationCancelRequest(derogation, authUser);

            return Ok(derogation);
        }

        [HttpPost("cancellation/{id}")]
        public IActionResult Cancellation(long id, Dictionary<string, string> reason)
        {
            var authUser = _userService.GetUserByName(this.User.Identity.Name);
            var derogation = _derogationService.GetDerogation(id);
            if (authUser == null || derogation == null)
                return BadRequest();

            if (derogation.Owner != authUser.DerogationUser)
            {
                return BadRequest(new {message = "Action is not allowed!"});
            }

            _derogationService.Cancellation(derogation, reason["reason"]);
            
            _notificationService.DerogationCancelled(derogation, _database.Users.Where(user => user.InMail == '1').ToList());

            return Ok(derogation);
        }

        [HttpPost("setEngFi/{id}")]
        public IActionResult SetEngFi(long id, Dictionary<string, object> request)
        {
            var authUser = _userService.GetUserByName(User.Identity.Name);
            var derogation = _derogationService.GetDerogation(id);

            if (authUser != null && authUser.FactoryDepartment.LtimeAccess == '1')
            {
                derogation.Ltime = int.Parse(request["ltime"].ToString() ?? "0");
                derogation.SLT = decimal.Parse(request["slt"].ToString() ?? "0");
            }


            if (authUser != null && authUser.FactoryDepartment.DCostAccess == '1')
            {
                derogation.DcostP = decimal.Parse(request["dcostP"].ToString() ?? "0");
                derogation.DcostF = decimal.Parse(request["dcostF"].ToString() ?? "0");
            }

            _database.SaveChanges();
            _notificationService.EngAndFlOptions(derogation, _database.Users
                .Where(user => user.InMail == '1').ToList());

            return Ok(derogation);
        }

        [HttpPost("new")]
        public IActionResult NewDerogation(DerogationHeader derogation)
        {
            var authUser = _userService.GetUserByName(User.Identity.Name);
            if (authUser != null && authUser.CanCreate == '0')
            {
                return BadRequest(new {message = "Action is not allowed"});
            }

            derogation.CreatedDate = DateTime.Now;

            derogation.DerogationItems.ForEach(dergItem =>
            {
                if (dergItem.ProductCode.Length > 30)
                {
                    dergItem.ProductCode = dergItem.ProductCode.Substring(0, 30);
                }

                if (dergItem.PartNo != null) return;
                
                dergItem.PartNo = "N/A";
                dergItem.PartNoDesc = "N/A";
            });

            var derogationDocs = new List<DerogationDoc>(derogation.DerogationDocs);
            
            derogation.DerogationDocs.Clear();

            _database.DerogationHeaders.Add(derogation);
            _database.SaveChanges();
            
            derogation.DerogationDocs.AddRange(derogationDocs);
            _database.SaveChanges();

            var recipients = _database.Users.Where(user => user.InMail == '1').ToList();
            _notificationService.NewDerogationIssued(derogation, recipients);

            return Ok(derogation);
        }
    }
}