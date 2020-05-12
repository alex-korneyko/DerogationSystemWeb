import { Component, OnInit } from "@angular/core";
import { DepartmentApiService } from "../../controllers/DepartmentApiService";
import { Department } from "../../model/domain/Department";
import { Router } from "@angular/router";

@Component({
    templateUrl: "DepartmentListComponent.html",
    providers: [DepartmentApiService]
})
export class DepartmentListComponent implements OnInit {

    departments: Department[];

    constructor(private apiService: DepartmentApiService, private router: Router) {}

    ngOnInit(): void {
        this.loadDepartments();

    }

    loadDepartments() {
        this.apiService.getDepartments()
            .subscribe((data: Department[]) => this.departments = data);
    }

    addNewClick() {
        this.router.navigateByUrl("/departments/department/create");
    }
}