namespace DerogationSystemWeb.Controllers.RequestModel
{
    public class ApprovalRequestModel
    {
        public long UserId { get; set; }
        public string ApproveValue { get; set; }
        public bool NeedTraining { get; set; }
        public string Comment { get; set; }
    }
}