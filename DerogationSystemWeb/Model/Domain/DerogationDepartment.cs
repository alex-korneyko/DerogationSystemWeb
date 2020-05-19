using System;

namespace DerogationSystemWeb.Model.Domain
{
    public class DerogationDepartment
    {
        public long DerogationId { get; set; }
        public DerogationHeader DerogationHeader { get; set; }

        public string Department { get; set; }
        public FactoryDepartment FactoryDepartment { get; set; }

        public int MailStep { get; set; }

        public char Training { get; set; }

        public char Approved { get; set; }

        public string Comment { get; set; }

        public char Rejected { get; set; }

        public char CancellationRequest { get; set; }

        public string CancellationReason { get; set; }

        public string DerogationUser { get; set; }
        public User User { get; set; }

        public DateTime OperationDate { get; set; }

        public char Checked { get; set; }
    }
}