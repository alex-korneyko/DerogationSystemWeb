using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DerogationSystemWeb.Model.Domain
{
    public class DerogationHeader
    {
        public long DerogationID { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Department { get; set; }
        public FactoryDepartment FactoryDepartment { get; set; }

        public string Owner { get; set; }
        public User Author { get; set; }

        public int Ltime { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal SLT { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DcostP { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DcostF { get; set; }

        public char Cancelled { get; set; }

        public char Approved { get; set; }

        public char Offline { get; set; }

        public string CancellationReason { get; set; }

        public List<DerogationDepartment> DerogationDepartments { get; set; }
    }
}