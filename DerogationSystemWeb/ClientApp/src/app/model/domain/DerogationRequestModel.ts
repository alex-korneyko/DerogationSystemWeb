import { RequestDerogationStatus } from "./RequestDerogationStatus";
import { Department } from "./Department";

export class DerogationRequestModel {

    public lastCount?: number;

    public workOrder?: number;
    public modelName?: string;
    public partNumber?: string;
    public departmentOwner?: Department;

    public byStatus?: RequestDerogationStatus;

    public fromDate?: Date;
    public toDate?: Date;

    constructor() {
        this.lastCount = 100;

        this.workOrder = 0;
        this.modelName = "";
        this.partNumber = "";
        this.departmentOwner = null;

        this.byStatus = RequestDerogationStatus.All;

        this.fromDate = this.minusDate(new Date(), 30);
        this.toDate = new Date();
    }

    private minusDate(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }
}