using System;

namespace DerogationSystemWeb.Model.Domain
{
    public class Workorder
    {
        public long Id { get; set; }
        public int OrderNo { get; set; }
        public DateTime OrderDate { get; set; }
        public string SKDPartNo { get; set; }
        public int Target { get; set; }
        public long ProductCode { get; set; }
    }
}