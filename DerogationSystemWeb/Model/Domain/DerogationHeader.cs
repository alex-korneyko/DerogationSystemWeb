using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DerogationSystemWeb.Model.Domain
{
    public class DerogationHeader : IEqualityComparer<DerogationHeader>
    {
        public long DerogationId { get; set; }

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

        public List<DerogationDepartment> DerogationDepartments { get; set; } = new List<DerogationDepartment>();

        public List<DerogationItem> DerogationItems { get; set; } = new List<DerogationItem>();

        public List<DerogationOperator> Operators { get; set; } = new List<DerogationOperator>();
        public bool Equals(DerogationHeader x, DerogationHeader y)
        {
            if (x == null || y == null)
                return false;

            return x.DerogationId == y.DerogationId;
        }

        public int GetHashCode(DerogationHeader obj)
        {
            throw new NotImplementedException();
        }
    }
}