import { Component, Input } from "@angular/core";
import { DerogationHeader } from "../../../../../../model/domain/DerogationHeader";
import { DerogationDepartment } from "../../../../../../model/domain/DerogationDepartment";

@Component({
    selector: "derogation-row",
    templateUrl: "DerogationHeaderRow.html",
    styleUrls: ["./DerogationHeaderRow.css"]
})
export class DerogationHeaderRow {

    @Input() derogation: DerogationHeader;

    getDeptsNamesInQueue(): string {

        let deptsForApproval: DerogationDepartment[];
        let minStep = 1000;
        let result = "";

        this.derogation.derogationDepartments.forEach(dept => {
            if (dept["approved"] === "0") {
                if (dept["mailStep"] < minStep) {
                    deptsForApproval = [];
                    deptsForApproval.push(dept);
                    minStep = dept["mailStep"];
                } else if (dept["mailStep"] === minStep) {
                    deptsForApproval.push(dept);
                }
            }
        });

        deptsForApproval.forEach(dept => result += ("/" + dept["department"]));

        return result;
    }
}