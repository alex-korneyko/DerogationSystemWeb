import {Component, OnInit} from "@angular/core";
import { DepartmentApiService } from "../../controllers/DepartmentApiService";
import { Department } from "../../model/domain/Department";

@Component({
    templateUrl: "DepartmentListComponent.html",
    providers: [DepartmentApiService]
})

export class DepartmentListComponent implements OnInit{

    departments: Department[];

    constructor(private apiService: DepartmentApiService) {}

    ngOnInit(): void {
        this.loadDepartments();
        
    }

    loadDepartments() {
        this.apiService.getDepartments()
            .subscribe((data: Department[]) => this.departments = data);
    }
}