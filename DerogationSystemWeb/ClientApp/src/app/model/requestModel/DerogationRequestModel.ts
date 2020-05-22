import { RequestDerogationStatus } from "../domain/RequestDerogationStatus";

export class DerogationRequestModel {

    public lastCount?: number;

    public derogationId?: number;
    public workOrder?: number;
    public modelName?: string;
    public partNumber?: string;
    public departmentOwner?: string;

    public byStatus?: string;

    public fromDate?: Date;
    public toDate?: Date;

    constructor() {
        this.lastCount = 100;

        this.derogationId = undefined;
        this.workOrder = undefined;
        this.modelName = "";
        this.partNumber = "";
        this.departmentOwner = RequestDerogationStatus[RequestDerogationStatus.All];

        this.byStatus = "All";

        this.fromDate = this.minusDate(new Date(), 30);
        this.toDate = new Date();
    }

    private minusDate(date: Date, days: number): Date {
        date.setDate(date.getDate() - days);
        return date;
    }
}