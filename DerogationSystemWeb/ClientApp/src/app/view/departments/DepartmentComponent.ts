import { Component, OnInit } from "@angular/core";
import { Department } from "../../model/domain/Department";
import { ActivatedRoute } from "@angular/router"
import { DepartmentApiService } from "../../controllers/DepartmentApiService";

@Component({
    templateUrl: "DepartmentComponent.html",
    providers: [DepartmentApiService]
})

export class DepartmentComponent implements OnInit {

    id: string;
    department: Department;

    constructor(private apiService: DepartmentApiService, activeRoute: ActivatedRoute) {
        this.id = activeRoute.snapshot.params["id"];
    }

    ngOnInit(): void {
        if (this.id) {
            this.apiService.getDepartment(this.id)
                .subscribe((data: Department) => this.department = data);
        }
    }
}