import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WorkOrder } from  "../model/domain/WorkOrder";

@Injectable()
export class WorkOrderApiService {

    workOrders: WorkOrder[];
    workOrdersIsLoaded = false;
    selectedWorkOrder: WorkOrder;

    private apiUrl = "/api/workOrders";

    constructor(private http: HttpClient) {
        this.selectedWorkOrder = new WorkOrder();
    }

    getAllWorkOrders() {
        this.workOrdersIsLoaded = false;

        this.http.get(this.apiUrl).subscribe((data: WorkOrder[]) => {
            this.workOrders = data;
            this.workOrdersIsLoaded = true;
        });
    }
}