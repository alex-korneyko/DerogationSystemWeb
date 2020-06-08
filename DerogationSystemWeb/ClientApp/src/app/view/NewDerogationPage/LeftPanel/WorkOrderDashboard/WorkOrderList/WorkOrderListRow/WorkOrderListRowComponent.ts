import { Component, Input } from "@angular/core";
import { WorkOrder } from "../../../../../../model/domain/WorkOrder";
import { WorkOrderApiService } from "../../../../../../controllers/WorkOrderApiService";

@Component({
    templateUrl: "WorkOrderListRowComponent.html",
    styleUrls: ["../../../../../../StyleSheet.css"],
    selector: "workorder-row"
})
export class WorkOrderListRowComponent {

    @Input() workOrder: WorkOrder;

    constructor(public workOrderApiService: WorkOrderApiService) {}

    woDblClick() {
        this.workOrderApiService.selectedWorkOrder = this.workOrder;

        // @ts-ignore
        $("#workOrdersModal").modal("hide");
    }
}