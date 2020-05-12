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
        public char Mandatory { get; set; } = '0';
        public char LtimeAccess { get; set; } = '0';
        public char DCostAccess { get; set; } = '0';
        public char AddDept { get; set; } = '0';
        public char ToBeAdded { get; set; } = '0';
        public char OnlyMail { get; set; } = '0';

        [JsonIgnore]
        public List<User> Users { get; set; }

        public FactoryDepartment()
        {
            this.Users = new List<User>();
        }
    }
}