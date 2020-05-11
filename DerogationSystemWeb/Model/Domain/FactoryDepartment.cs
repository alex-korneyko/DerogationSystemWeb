using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DerogationSystemWeb.Model.Domain
{
    public class FactoryDepartment
    {
        public string Department { get; set; }
        public int MAilStep { get; set; }
        public char Mandatory { get; set; }
        public char LtimeAccess { get; set; }
        public char DCostAccess { get; set; }
        public char AddDept { get; set; }
        public char ToBeAdded { get; set; }
        public char OnlyMail { get; set; }

        [JsonIgnore]
        public List<User> Users { get; set; }
    }
}