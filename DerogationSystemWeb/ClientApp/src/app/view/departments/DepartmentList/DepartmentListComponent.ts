import { Component, OnInit } from "@angular/core";
import { DepartmentApiService } from "../../../controllers/DepartmentApiService";
import { Department } from "../../../model/domain/Department";
import { Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import {LoginApiService} from "../../../controllers/LoginApiService";

@Component({
    templateUrl: "DepartmentListComponent.html",
    providers: [DepartmentApiService]
})
export class DepartmentListComponent implements OnInit {

    constructor(
        public departmentApiService: DepartmentApiService,
        public loginApiService: LoginApiService,
        private router: Router,) {}
        
    ngOnInit(): void {
        this.departmentApiService.loadDepartments();
    }

    addNewClick() {
        this.router.navigateByUrl("/departments/newDepartment");
    }

    deleteDepartment(department: string) {
        this.departmentApiService.deleteDepartment(department).subscribe((data: HttpResponse<string>) => {
            if (data !== null && data["notEmpty"] !== undefined) {
                console.log(data["notEmpty"].errors[0].errorMessage);
            }
            this.departmentApiService.loadDepartments();
        });
    }
}