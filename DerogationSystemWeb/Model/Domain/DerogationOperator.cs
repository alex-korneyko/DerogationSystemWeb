using System;
using System.Text.Json.Serialization;

namespace DerogationSystemWeb.Model.Domain
{
    public class DerogationOperator
    {
        public long Id { get; set; }

        public long DerogationId { get; set; }
        [JsonIgnore]
        public DerogationHeader DerogationHeader { get; set; }

        public string StationName { get; set; }

        public int Hc { get; set; }

        public string DerogationUser { get; set; }
        public User Author { get; set; }

        public DateTime InsertedDate { get; set; }
    }
}