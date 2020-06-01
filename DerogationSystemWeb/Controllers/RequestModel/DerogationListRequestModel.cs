using System;

namespace DerogationSystemWeb.Controllers.RequestModel
{
    public class DerogationListRequestModel
    {
        public int LastCount { get; set; }

        public long DerogationId { get; set; }

        public int WorkOrder { get; set; }

        public string ModelName { get; set; }

        public string PartNumber { get; set; }

        public string DepartmentOwner { get; set; }

        public string ByStatus { get; set; }

        public bool UseDateRange { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }
    }
}