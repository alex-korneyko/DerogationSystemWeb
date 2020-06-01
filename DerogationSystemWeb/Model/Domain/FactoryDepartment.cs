using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DerogationSystemWeb.Model.Domain
{
    public class FactoryDepartment : IEqualityComparer<FactoryDepartment>
    {
        public string Department { get; set; }
        public int MAilStep { get; set; }
        public char Mandatory { get; set; } = '0';
        public char LtimeAccess { get; set; } = '0';
        public char DCostAccess { get; set; } = '0';
        public char AddDept { get; set; } = '0';
        public char ToBeAdded { get; set; } = '0';
        public char OnlyMail { get; set; } = '0';

        [JsonIgnore]
        public List<User> Users { get; set; } = new List<User>();

        [JsonIgnore] 
        public List<DerogationHeader> DerogationHeaders { get; set; } = new List<DerogationHeader>();

        public bool Equals(FactoryDepartment x, FactoryDepartment y)
        {
            if (x == null || y == null)
                return false;

            return x.Department == y.Department;
        }

        public int GetHashCode(FactoryDepartment obj)
        {
            throw new NotImplementedException();
        }
    }
}