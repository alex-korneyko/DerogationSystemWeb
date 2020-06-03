import { Component } from "@angular/core";
import { DerogationApiService } from  "../../../../controllers/DerogationApiService";
import { DepartmentApiService } from "../../../../controllers/DepartmentApiService";

@Component({
    templateUrl: "DeptsInvolvingComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "depts-involve-box"
})
export class DeptsInvolvingComponent {

    constructor(derogationApiService: DerogationApiService, departmentApiService: DepartmentApiService) {}
}