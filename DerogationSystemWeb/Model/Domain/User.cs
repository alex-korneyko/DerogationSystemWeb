using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DerogationSystemWeb.Model.Domain
{
    public class User
    {
        public long Id { get; set; }
        public string DerogationUser { get; set; }
        public string UserMailBase { get; set; }
        public char Admin { get; set; } = '0';
        public char CanCreate { get; set; } = '0';
        public char CanApprove { get; set; } = '0';
        public char InMail { get; set; } = '0';

        public string Department { get; set; }
        public FactoryDepartment FactoryDepartment { get; set; }

        [JsonIgnore]
        public List<DerogationHeader> DerogationHeaders { get; set; }

        public User()
        {
            this.DerogationHeaders = new List<DerogationHeader>();
        }
    }
}