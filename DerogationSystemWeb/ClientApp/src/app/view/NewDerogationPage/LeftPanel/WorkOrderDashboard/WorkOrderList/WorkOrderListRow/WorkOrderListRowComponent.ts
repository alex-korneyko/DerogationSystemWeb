import { Component, Input } from "@angular/core";
import { WorkOrder } from "../../../../../../model/domain/WorkOrder";

@Component({
    templateUrl: "WorkOrderListRowComponent.html",
    styleUrls: ["../../../../../../StyleSheet.css"],
    selector: "workorder-row"
})
export class WorkOrderListRowComponent {

    @Input() workOrder: WorkOrder;
}