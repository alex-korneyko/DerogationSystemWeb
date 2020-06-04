using System;
using System.Diagnostics.CodeAnalysis;

namespace DerogationSystemWeb.Model.Domain
{
    public class WorkOrder
    {
        public long WorkOrderId { get; set; }
        public string OrderNo { get; set; }
        [AllowNull]
        public DateTime OrderDate { get; set; }
        public string SkdPartNo { get; set; }
        public Material Material { get; set; }
        public int Target { get; set; }
    }
}