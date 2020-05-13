import { Component, OnInit } from "@angular/core";
import { Department } from "../../../model/domain/Department";
import { Router, ActivatedRoute } from "@angular/router";
import { DepartmentApiService } from "../../../controllers/DepartmentApiService";

@Component({
    templateUrl: "DepartmentEdtComponent.html",
    providers: [DepartmentApiService]
})

export class DepartmentEdtComponent implements OnInit {

    id: string;
    department: Department;
    loaded: boolean = false;

    constructor(private apiService: DepartmentApiService, activeRoute: ActivatedRoute, private  router: Router) {
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
        this.apiService.updateDepartment(this.id, this.department).subscribe(data => this.router.navigateByUrl("/departments"));
    }


}