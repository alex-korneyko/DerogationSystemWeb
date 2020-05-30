using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using DerogationSystemWeb.Controllers.RequestModel;
using DerogationSystemWeb.Model.Configs;
using DerogationSystemWeb.Model.Domain;
using Microsoft.EntityFrameworkCore;

namespace DerogationSystemWeb.Model.Services
{
    public class DerogationService
    {
        private readonly ApplicationContext _db;

        public DerogationService(ApplicationContext db)
        {
            _db = db;
        }

        public List<DerogationHeader> GetFilteredList(DerogationListRequestModel model, User user)
        {
            if (model.DerogationId != 0)
            {
                var derogation = _db.DerogationHeaders
                    .Include(dHeader => dHeader.Author)
                    .Include(dHeader => dHeader.FactoryDepartment)
                    .FirstOrDefault(derg => derg.DerogationId == model.DerogationId);

                return new List<DerogationHeader>{derogation};
            }

            var derogationList = _db.DerogationHeaders
                .Where(derg => derg.CreatedDate >= model.FromDate && derg.CreatedDate <= model.ToDate)
                .Include(dHeader => dHeader.Author)
                .Include(dHeader => dHeader.FactoryDepartment)
                .ToList();

            var result = new List<DerogationHeader>(derogationList);

            if (model.DepartmentOwner != "All")
            {
                result = result.FindAll(derg => derg.Department == model.DepartmentOwner);
            }

            if (model.ByStatus != "All")
            {
                switch (model.ByStatus)
                {
                    case "NewForMe":
                        result = DerogationsOnlyForMe(user);
                        break;
                    case "MyTurnForApproval":
                        result = DerogationsOnlyForMe(user);
                        result = OnlyForMyApproval(user, result);
                        break;
                    case "InProgress":
                        result = result.FindAll(derg =>
                            derg.Approved != '1' && derg.Cancelled != '1' && derg.Offline != '1');
                        break;
                    case "Approved":
                        result = result.FindAll(derg => derg.Approved == '1');
                        break;
                    case "Cancelled":
                        result = result.FindAll(derg => derg.Cancelled == '1');
                        break;
                    case "Offline":
                        result = result.FindAll(derg => derg.Offline == '1');
                        break;
                }
            }

            result.Sort(((derg1, derg2) => derg1.CreatedDate < derg2.CreatedDate ? 1 : 0));

            var count = model.LastCount > result.Count ? result.Count : model.LastCount;
            var croppedResult = result.GetRange(result.Count - count, count);

            return croppedResult;
        }

        public List<FactoryDepartment> GetNextDeptsForApproval(DerogationHeader derogation)
        {
            var departments = derogation.DerogationDepartments;
            var currentMinStepForApprove = 1000;

            departments.ForEach(dept =>
            {
                if (dept.Approved == '0' && dept.MailStep < currentMinStepForApprove)
                    currentMinStepForApprove = dept.MailStep;
            });

            var curApproveDepts = departments
                .FindAll(dept => dept.MailStep == currentMinStepForApprove)
                .ToList();

            var factoryDepartments = new List<FactoryDepartment>();
            curApproveDepts.ForEach(dDept =>
            {
                var factoryDeptForApproval = _db.Departments.First(fDept => fDept.Department == dDept.Department);
                if (factoryDeptForApproval != null) factoryDepartments.Add(factoryDeptForApproval);
            });
            
            return factoryDepartments;
        }

        private List<DerogationHeader> DerogationsOnlyForMe(User user)
        {
            var result = _db.DerogationHeaders
                .Where(derg =>
                    derg.Approved != '1' && derg.Cancelled != '1' && derg.Offline != '1')
                .Include(dHeader => dHeader.Author)
                .Include(dHeader => dHeader.FactoryDepartment)
                .Include(dHeader => dHeader.DerogationDepartments)
                .ToList();

            result = result
                .FindAll(derg =>
                    derg.DerogationDepartments
                        .FindAll(dDept => (dDept.Department == user.Department && dDept.Approved == '0')).Count > 0);

            return result;
        }

        private List<DerogationHeader> OnlyForMyApproval(User user, List<DerogationHeader> derogations)
        {
            var step = user.FactoryDepartment.MAilStep;

            var result = derogations.FindAll(derogation => derogation.DerogationDepartments
                .FindAll(dDept =>
                    dDept.MailStep < step && dDept.Approved == '1')
                .Count > 0);

            result = result.FindAll(derogation => derogation.DerogationDepartments
                .FindAll(dDept =>
                    dDept.MailStep == step && dDept.Approved == '0')
                .Count > 0);

            return result;
        }
    }
}