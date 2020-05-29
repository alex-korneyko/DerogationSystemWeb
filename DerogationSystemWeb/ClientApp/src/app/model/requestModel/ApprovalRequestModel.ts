
export class ApprovalRequestModel {
    constructor(
        public userId?: number,
        public approveValue?: string,
        public needTraining?: boolean,
        public comment?: string
    ) {
        this.approveValue = "approve";
    }
}