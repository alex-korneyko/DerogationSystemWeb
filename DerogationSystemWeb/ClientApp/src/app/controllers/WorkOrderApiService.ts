import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WorkOrder } from  "../model/domain/WorkOrder";

@Injectable()
export class WorkOrderApiService {

    workOrders: WorkOrder[];
    workOrdersIsLoaded = false;
    selectedWorkOrder: WorkOrder;
    maskString = "";

    private apiUrl = "/api/workOrders";

    constructor(private http: HttpClient) {
        this.selectedWorkOrder = new WorkOrder();
    }

    async getAllWorkOrders() {
        this.workOrdersIsLoaded = false;

        await this.http.get(this.apiUrl).subscribe((data: WorkOrder[]) => {
            this.workOrders = data;
            this.workOrdersIsLoaded = true;
        });
    }

    async getWorkOrdersByMask() {
        this.workOrdersIsLoaded = false;
        await this.http.post(this.apiUrl + `/byMask?mask=${this.maskString}`, this.maskString)
            .subscribe((data: WorkOrder[]) => {
                this.workOrders = data;
                this.workOrdersIsLoaded = true;
            });
    }
}