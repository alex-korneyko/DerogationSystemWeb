using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using DerogationSystemWeb.Controllers;
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
            if (!model.UseDateRange)
            {
                model.FromDate = DateTime.MinValue;
                model.ToDate = DateTime.MaxValue;
            }

            if (model.DerogationId != 0)
            {
                var derogation = _db.DerogationHeaders
                    .Include(dHeader => dHeader.Author)
                    .Include(dHeader => dHeader.FactoryDepartment)
                    .Include(dHeader => dHeader.Operators)
                    .FirstOrDefault(derg => derg.DerogationId == model.DerogationId);

                return new List<DerogationHeader>{derogation};
            }

            if (model.WorkOrder != 0)
            {
                var derogationsByWorkOrder = GetDerogationsByWorkOrder(model.WorkOrder.ToString());

                return derogationsByWorkOrder;
            }

            if (model.ModelName != "")
            {
                var derogationsByModelName = GetDerogationsByModelName(model.ModelName);

                return derogationsByModelName;
            }

            if (model.PartNumber != "")
            {
                var derogationsByPartNumber = GetDerogationsByPartNumber(model.PartNumber);

                return derogationsByPartNumber;
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
                        result = new List<DerogationHeader>();
                        derogationList.ForEach(derogation =>
                        {
                            if (derogation.Approved == '0' && derogation.Cancelled == '0')
                            {
                                derogation = GetDerogation(derogation.DerogationId);
                            }

                            derogation.DerogationDepartments.ForEach(dDept =>
                            {
                                if (dDept.Department != user.Department) return;

                                if (dDept.Approved == '0' && dDept.Rejected == '0' & dDept.CancellationRequest == '0')
                                {
                                    result.Add(derogation);
                                }
                            });
                        });
                        break;
                    case "MyTurnForApproval":
                        result = new List<DerogationHeader>();
                        derogationList.ForEach(derogation =>
                        {
                            if (derogation.Approved == '0' && derogation.Cancelled == '0')
                            {
                                derogation = GetDerogation(derogation.DerogationId);
                            }

                            GetNextDeptsForApproval(derogation).ForEach(fDept =>
                            {
                                if (!fDept.Equals(user.FactoryDepartment)) return;

                                var dDepartment = GetDergDeptByDepartmentName(derogation, fDept.Department);
                                if (dDepartment.Approved != '1' && dDepartment.Rejected != '1' && dDepartment.CancellationRequest != '1')
                                {
                                    result.Add(derogation);
                                }
                            });
                        });

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

            result.Sort(((derg1, derg2) => derg1.CreatedDate < derg2.CreatedDate ? 1 : -1));

            var count = model.LastCount > result.Count ? result.Count : model.LastCount;
            var croppedResult = result.GetRange(0, count);

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

        public DerogationHeader GetDerogation(long id)
        {
            var derogation = _db.DerogationHeaders
                .Include(dh => dh.Author)
                .Include(dh => dh.FactoryDepartment)
                .Include(dh => dh.DerogationDepartments)
                .Include(dh => dh.DerogationItems)
                .Include(dh => dh.Operators)
                .First(derg => derg.DerogationId == id);
            return derogation;
        }

        private List<DerogationHeader> GetDerogationsByWorkOrder(string workOrder)
        {
            var result = new List<DerogationHeader>();
            var derogationItems = _db.DerogationItems
                .Where(di => di.WorkOrder == workOrder).ToList();

            derogationItems.ForEach(dItem =>
            {
                var derogation = GetDerogation(dItem.DerogationId);
                if (result.FirstOrDefault(dHeader => dHeader.DerogationId == derogation.DerogationId) == null)
                {
                    result.Add(derogation);
                }
            });

            return result;
        }

        private List<DerogationHeader> GetDerogationsByModelName(string modelName)
        {
            var result = new List<DerogationHeader>();
            var derogationItems = _db.DerogationItems
                .Where(di => di.ModelName == modelName).ToList();

            derogationItems.ForEach(dItem =>
            {
                var derogation = GetDerogation(dItem.DerogationId);
                if (result.FirstOrDefault(dHeader => dHeader.DerogationId == derogation.DerogationId) == null)
                {
                    result.Add(derogation);
                }
            });

            return result;
        }

        private List<DerogationHeader> GetDerogationsByPartNumber(string partNumber)
        {
            var result = new List<DerogationHeader>();
            var derogationItems = _db.DerogationItems
                .Where(di => di.PartNo == partNumber || di.APartNo == partNumber).ToList();

            derogationItems.ForEach(dItem =>
            {
                var derogation = GetDerogation(dItem.DerogationId);
                if (result.FirstOrDefault(dHeader => dHeader.DerogationId == derogation.DerogationId) == null)
                {
                    result.Add(derogation);
                }
            });

            return result;
        }

        public void ChangeDergDeptStatusByUser(DerogationHeader derogation, User authUser, ApprovalRequestModel requestModel)
        {
            var derogationDepartment =
                derogation.DerogationDepartments.Find(dDept => dDept.Department == authUser.Department);

            derogationDepartment.Comment = requestModel.Comment;
            derogationDepartment.DerogationUser = authUser.DerogationUser;
            derogationDepartment.OperationDate = DateTime.Now;

            if (requestModel.ApproveValue == "approve")
            {
                derogationDepartment.Approved = '1';
                derogationDepartment.Training = requestModel.NeedTraining ? '1' : '0';
                requestModel.Operators.ForEach(operatorBox =>
                {
                    operatorBox.InsertedDate = DateTime.Now;
                    derogation.Operators.Add(operatorBox);
                });

                DerogationFullyApproveCheckAndSet(derogation);
            }
            else
            {
                derogationDepartment.Rejected = '1';
            }

            _db.SaveChanges();
        }

        public void CancellationRequest(DerogationHeader derogation, User authUser, string reason)
        {
            var derogationDepartment =
                derogation.DerogationDepartments.Find(dDept => dDept.Department == authUser.Department);

            derogationDepartment.CancellationReason = reason;
            derogationDepartment.CancellationRequest = '1';

            _db.SaveChanges();
        }

        public void Cancellation(DerogationHeader derogation, string reason)
        {
            derogation.Cancelled = '1';
            derogation.CancellationReason = reason;

            _db.SaveChanges();
        }

        private DerogationDepartment GetDergDeptByDepartmentName(DerogationHeader derogation, string departmentName)
        {
            return derogation.DerogationDepartments.FirstOrDefault(derogationDepartment => derogationDepartment.Department == departmentName);
        }

        private void DerogationFullyApproveCheckAndSet(DerogationHeader derogation)
        {
            var isAllApprove = true;
            derogation.DerogationDepartments.ForEach(dDept => isAllApprove &= dDept.Approved == '1');
            derogation.Approved = isAllApprove ? '1' : '0';
        }
    }
}