import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "InvolvedDepartmentsListComponent.html",
    selector: "involved-departments-list"
})
export class InvolvedDepartmentsListComponent {

    constructor(public derogationApiService: DerogationApiService) {}
}