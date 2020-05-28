import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { DerogationHeader } from "../../../../../../model/domain/DerogationHeader";
import { DerogationDepartment } from "../../../../../../model/domain/DerogationDepartment";
import { DerogationApiService } from "../../../../../../controllers/DerogationApiService";

@Component({
    selector: "derogation-row",
    templateUrl: "DerogationHeaderRow.html",
    styleUrls: ["../../../../../../StyleSheet.css"]
})
export class DerogationHeaderRow {

    @Input() derogation: DerogationHeader;

    constructor(public derogationApiService: DerogationApiService, private router: Router) {}

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

    derogationClick() {
        this.derogationApiService.getDerogation(this.derogation.derogationId, true);
    }

    derogationDoubleClick() {
        this.router.navigateByUrl("/derogations/derogation/" + this.derogation.derogationId);
    }
}