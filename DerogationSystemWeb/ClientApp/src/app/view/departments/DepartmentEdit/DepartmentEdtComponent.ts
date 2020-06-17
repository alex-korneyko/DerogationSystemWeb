import { Component, OnInit } from "@angular/core";
import { Department } from "../../../model/domain/Department";
import { Router, ActivatedRoute } from "@angular/router";
import { DepartmentApiService } from "../../../controllers/DepartmentApiService";
import {LoginApiService} from "../../../controllers/LoginApiService";

@Component({
    templateUrl: "DepartmentEdtComponent.html",
    providers: [DepartmentApiService]
})

export class DepartmentEdtComponent implements OnInit {

    id: string;
    department: Department;
    loaded: boolean = false;

    constructor(private apiService: DepartmentApiService,
                public loginApiService: LoginApiService,
                activeRoute: ActivatedRoute, 
                private  router: Router) {
        this.id = activeRoute.snapshot.params["id"];
    }

    ngOnInit(): void {
        if (this.id) {
            this.apiService.getDepartment(this.id)
                .subscribe((data: Department) => {
                    this.department = data;
                    if (this.department !== null) this.loaded = true;
                });
        }
    }

    save() {
//        console.log(this.department);
        this.apiService.updateDepartment(this.id, this.department).subscribe(() => this.router.navigateByUrl("/departments"));
    }

    disabled() {
        return this.department.department === undefined || this.department.department === "" || this.loginApiService.loggedInUser.admin === "0";
    }


}