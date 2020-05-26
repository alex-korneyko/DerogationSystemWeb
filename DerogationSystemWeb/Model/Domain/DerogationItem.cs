using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DerogationSystemWeb.Model.Domain
{
    public class DerogationItem
    {
        public long Id { get; set; }

        public long DerogationId { get; set; }

        [JsonIgnore] 
        public DerogationHeader DerogationHeader { get; set; }

        public string WorkOrder { get; set; }

        public string ModelName { get; set; }

        public string ProductCode { get; set; }

        public string PartNo { get; set; }

        public string PartNoDesc { get; set; }

        public string APartNo { get; set; }

        public string APartNoDesc { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal AQuantity { get; set; }

        public string Reason { get; set; }

        public string Action { get; set; }

        public string Supplier { get; set; }
    }
}