import { Component, OnInit } from "@angular/core";
import { DepartmentApiService } from "../../../../controllers/DepartmentApiService";
import { LoginApiService } from "../../../../controllers/LoginApiService";

@Component({
    templateUrl: "DeptsInvolvingComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "depts-involve-box"
})
export class DeptsInvolvingComponent implements OnInit {

    constructor(public departmentApiService: DepartmentApiService, public loginApiService: LoginApiService) {}

    ngOnInit(): void {
        this.departmentApiService.loadDepartments();
    }
}