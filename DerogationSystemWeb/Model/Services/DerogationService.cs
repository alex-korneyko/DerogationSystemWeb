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
            var derogationList = _db.DerogationHeaders
                .Include(dHeader => dHeader.Author)
                .Include(dHeader => dHeader.FactoryDepartment)
                .ToList();

            var result = new List<DerogationHeader>(derogationList);

            if (model.DerogationId != 0)
            {
                result = new List<DerogationHeader>();
                var derogationHeader =
                    derogationList.First(derogation => derogation.DerogationId == model.DerogationId);
                result.Add(derogationHeader);

                return result;
            }

            if (model.DepartmentOwner != "All")
            {
                result = result.FindAll(derg => derg.Department == model.DepartmentOwner);
            }

            if (model.ByStatus != "All")
            {
                switch (model.ByStatus)
                {
                    case "NewForMe":
                        result = derogationsOnlyForMe(user);
                        break;
                    case "MyTurnForApproval":
                        result = derogationsOnlyForMe(user);
                        //TODO this
                        break;
                    case "InProgress":
                        result = result.FindAll(derg => derg.Approved != '1' && derg.Cancelled != '1' && derg.Offline != '1');
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

            var count = model.LastCount > result.Count ? result.Count : model.LastCount;
            var croppedResult = result.GetRange(result.Count - count, count);

            return croppedResult;
        }

        private List<DerogationHeader> derogationsOnlyForMe(User user)
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
                        .FindAll(dDept => dDept.Department == user.Department && dDept.Approved == '0').Count > 0);

            return result;
        }
    }
}