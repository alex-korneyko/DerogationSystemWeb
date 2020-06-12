using System;

namespace DerogationSystemWeb.Model.Domain
{
    public class Material
    {
        public long MaterialId { get; set; }
        public string PartNo { get; set; }
        public string Description { get; set; }
        public DateTime? CreateDate { get; set; }
    }
}