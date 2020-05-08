using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DerogationSystemWeb.Model.Domain
{
    public class Department
    {
        [
            Column("Department"),
            Key,
            MaxLength(30)
        ]
        public string DepartmentCode { get; set; }

        public int MAilStep { get; set; }

        [Column(TypeName = "smallint")]
        public bool Mandatory { get; set; }

        [Column(TypeName = "smallint")]
        public bool LtimeAccess { get; set; }

        [Column(TypeName = "smallint")]
        public bool DCostAccess { get; set; }

        [Column(TypeName = "smallint")]
        public bool AddDept { get; set; }

        [Column(TypeName = "smallint")]
        public bool ToBeAdded { get; set; }

        [Column(TypeName = "smallint")]
        public bool OnlyMail { get; set; }

        protected bool Equals(Department other)
        {
            return DepartmentCode == other.DepartmentCode;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((Department) obj);
        }

        public override int GetHashCode()
        {
            return (DepartmentCode != null ? DepartmentCode.GetHashCode() : 0);
        }

        public override string ToString()
        {
            return
                $"{nameof(DepartmentCode)}: {DepartmentCode}, " +
                $"{nameof(MAilStep)}: {MAilStep}, " +
                $"{nameof(Mandatory)}: {Mandatory}, " +
                $"{nameof(LtimeAccess)}: {LtimeAccess}, " +
                $"{nameof(DCostAccess)}: {DCostAccess}, " +
                $"{nameof(AddDept)}: {AddDept}, " +
                $"{nameof(ToBeAdded)}: {ToBeAdded}, " +
                $"{nameof(OnlyMail)}: {OnlyMail}";
        }
    }
}