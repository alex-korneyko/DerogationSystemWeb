﻿import { Component, OnInit } from "@angular/core";
import { DerogationApiService } from "../../../../../controllers/DerogationApiService";
import { DepartmentApiService } from "../../../../../controllers/DepartmentApiService";

@Component({
    templateUrl: "./DataFilterComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "data-filter"
})
export class DataFilterComponent implements OnInit {

    constructor(public derogationApiService: DerogationApiService, public departmentApiService: DepartmentApiService) { }

    ngOnInit(): void {
         this.departmentApiService.loadDepartments();
    }

}