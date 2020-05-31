using System.Collections.Generic;
using DerogationSystemWeb.Model.Domain;

namespace DerogationSystemWeb.Controllers.RequestModel
{
    public class ApprovalRequestModel
    {
        public long UserId { get; set; }
        public string ApproveValue { get; set; }
        public bool NeedTraining { get; set; }
        public string Comment { get; set; }
        public List<DerogationOperator> Operators { get; set; } = new List<DerogationOperator>();
    }
}