import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";
import { DerogationDepartment } from "../../../../model/domain/DerogationDepartment";

@Component({
    templateUrl: "./InvolvedDepartmentsListComponent.html",
    styleUrls: ["./InvolvedDepartmentsListComponent.css", "../../../../StyleSheet.css"],
    selector: "involved-departments-list"
})
export class InvolvedDepartmentsListComponent {

    constructor(public derogationApiService: DerogationApiService) { }

    getSortedInvolvedDepartments(): DerogationDepartment[] {

        const result = this.derogationApiService.currentDerogation.derogationDepartments.sort((dd1, dd2) => {
            if (dd1.mailStep < dd2.mailStep) {
                return -1;
            } else if (dd1.mailStep > dd2.mailStep) {
                return 1;
            }
            return 0;
        });

        return result;
    }
}