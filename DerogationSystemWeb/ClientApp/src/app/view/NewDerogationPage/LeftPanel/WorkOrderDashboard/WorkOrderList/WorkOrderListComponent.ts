import { Component, OnInit } from "@angular/core";
import { WorkOrderApiService } from "../../../../../controllers/WorkOrderApiService";

@Component({
    templateUrl: "WorkOrderListComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "workorder-list"
})
export class WorkOrderListComponent implements OnInit{

    constructor(public workOrderApiService: WorkOrderApiService) { }

    ngOnInit(): void {
        this.workOrderApiService.getAllWorkOrders();
    }

    maskStringChange() {
        this.workOrderApiService.getWorkOrdersByMask();
    }
}