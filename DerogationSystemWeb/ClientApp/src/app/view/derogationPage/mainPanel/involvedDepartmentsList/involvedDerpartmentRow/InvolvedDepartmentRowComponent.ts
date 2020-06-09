import { Component, Input } from "@angular/core";
import { DerogationHeader } from "../../../../../model/domain/DerogationHeader";
import { DerogationDepartment } from "../../../../../model/domain/DerogationDepartment";

@Component({
    templateUrl: "./InvolvedDepartmentRowComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "inv-department-row"
})
export class InvolvedDepartmentRowComponent {

    @Input()
    involvedDepartment: DerogationDepartment;

    getOperationDate(): Date {

        if (this.involvedDepartment.operationDate === null || this.involvedDepartment.operationDate.toString() === "0001-01-01T00:00:00") {
            return null;
        }

        return this.involvedDepartment.operationDate;
    }
}