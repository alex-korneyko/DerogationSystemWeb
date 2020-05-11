using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DerogationSystemWeb.Model.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string DerogationUser { get; set; }
        public string UserMailBase { get; set; }
        public char Admin { get; set; }
        public char CanCreate { get; set; }
        public char CanApprove { get; set; }
        public char InMail { get; set; }

        [JsonIgnore]
        public string Department { get; set; }
        public FactoryDepartment FactoryDepartment { get; set; }
    }
}