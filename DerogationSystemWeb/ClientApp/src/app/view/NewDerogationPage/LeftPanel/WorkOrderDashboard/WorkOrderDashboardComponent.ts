import { Component } from "@angular/core";
import { WorkOrderApiService } from "../../../../controllers/WorkOrderApiService";
import {DerogationApiService} from "../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "WorkOrderDashboardComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "workorder-dashboard"
})
export class WorkOrderDashboardComponent {

    constructor(public workOrderApiService: WorkOrderApiService, public derogationApiService: DerogationApiService) {}
}