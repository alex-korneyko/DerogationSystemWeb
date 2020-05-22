import { Component, OnInit } from "@angular/core";
import { DepartmentApiService } from "../../../controllers/DepartmentApiService";
import { Department } from "../../../model/domain/Department";
import { Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";

@Component({
    templateUrl: "DepartmentListComponent.html",
    providers: [DepartmentApiService]
})
export class DepartmentListComponent implements OnInit {

    departments: Department[];

    constructor(public departmentApiService: DepartmentApiService, private router: Router) {}

    ngOnInit(): void {
        this.departmentApiService.getDepartments();
    }

    addNewClick() {
        this.router.navigateByUrl("/departments/newDepartment");
    }

    deleteDepartment(department: string) {
        this.departmentApiService.deleteDepartment(department).subscribe((data: HttpResponse<string>) => {
            if (data !== null && data["notEmpty"] !== undefined) {
                console.log(data["notEmpty"].errors[0].errorMessage);
            }
            this.departmentApiService.getDepartments();
        });
    }
}