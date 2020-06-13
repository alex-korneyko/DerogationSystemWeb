using System;
using System.Text.Json.Serialization;

namespace DerogationSystemWeb.Model.Domain
{
    public class DerogationDoc
    {
        public long Id { get; set; }

        public long DerogationID { get; set; }
        [JsonIgnore]
        public DerogationHeader DerogationHeader { get; set; }

        public string DerogationUser { get; set; }
        [JsonIgnore]
        public User Author { get; set; }

        public string Department { get; set; }
        [JsonIgnore]
        public FactoryDepartment FactoryDepartment { get; set; }

        public string DocName { get; set; }

        public DateTime? InsertedDate { get; set; }
    }
}