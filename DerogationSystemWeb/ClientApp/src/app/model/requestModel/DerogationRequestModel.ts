import { RequestDerogationStatus } from "../requestModel/RequestDerogationStatus";

export class DerogationRequestModel {

    public lastCount?: number;

    public derogationId?: number;
    public workOrder?: number;
    public modelName?: string;
    public partNumber?: string;
    public departmentOwner?: string;

    public byStatus?: string;

    public fromDate?: string;
    public toDate?: string;

    constructor() {
        this.lastCount = 100;

        this.derogationId = undefined;
        this.workOrder = undefined;
        this.modelName = "";
        this.partNumber = "";
        this.departmentOwner = RequestDerogationStatus[RequestDerogationStatus.All];

        this.byStatus = "All";

        this.toDate = this.formatDate(new Date());
        this.fromDate = this.formatDate(this.minusDate(new Date(), 30));
    }

    private minusDate(date: Date, days: number): Date {
        date.setDate(date.getDate() - days);
        return date;
    }

    private formatDate(date: Date): string {
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        let day = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
        let result = year + "-" + month + "-" + day;
        return result;
    }
}