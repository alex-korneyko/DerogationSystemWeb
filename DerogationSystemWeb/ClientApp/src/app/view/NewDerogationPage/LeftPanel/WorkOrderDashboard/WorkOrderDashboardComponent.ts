import { Component } from "@angular/core";
import { WorkOrderApiService } from "../../../../controllers/WorkOrderApiService";

@Component({
    templateUrl: "WorkOrderDashboardComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "workorder-dashboard"
})
export class WorkOrderDashboardComponent {

    constructor(public workOrderApiService: WorkOrderApiService) {}
}