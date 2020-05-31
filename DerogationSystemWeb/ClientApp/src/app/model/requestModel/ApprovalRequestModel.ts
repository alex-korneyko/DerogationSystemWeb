import { DerogationOperator } from '../domain/DerogationOperator';

export class ApprovalRequestModel {
    constructor(
        public userId?: number,
        public approveValue?: string,
        public needTraining?: boolean,
        public comment?: string,
        public operators = new Array<DerogationOperator>()
    ) {
        this.approveValue = "approve";
    }
}