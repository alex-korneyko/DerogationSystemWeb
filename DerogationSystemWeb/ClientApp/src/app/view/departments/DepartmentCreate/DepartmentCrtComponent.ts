import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Department } from "../../../model/domain/Department";
import { DepartmentApiService } from "../../../controllers/DepartmentApiService";

@Component({
    templateUrl: "DepartmentCrtComponent.html",
    providers: [DepartmentApiService]
})
export class DepartmentCrtComponent {

    department: Department = new Department();

    constructor(private apiService: DepartmentApiService, private router: Router) { }

    save() {
        this.apiService.saveDepartment(this.department).subscribe(() => this.router.navigateByUrl("/departments"));
    }
}