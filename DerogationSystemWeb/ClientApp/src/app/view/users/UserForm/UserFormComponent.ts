import { Component, Input, OnInit } from "@angular/core";
import { User } from "../../../model/domain/User";
import { DepartmentApiService } from "../../../controllers/DepartmentApiService";

@Component({
    selector: "user-form",
    templateUrl: "UserFormComponent.html"
})
export class UserFormComponent implements OnInit {

    @Input()
    user: User;

    departments: string[];

    constructor(private departmentApiService: DepartmentApiService) {}

    ngOnInit(): void {
        this.departmentApiService.getDepartments().subscribe((data: string[]) => this.departments = data);
    }
}