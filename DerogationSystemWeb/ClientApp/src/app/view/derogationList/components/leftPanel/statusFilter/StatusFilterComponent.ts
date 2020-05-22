import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../../controllers/DerogationApiService";

@Component({
    selector: "status-filter",
    templateUrl: "./StatusFilterComponent.html"
})
export class StatusFilterComponent {

    constructor(public derogationApiService: DerogationApiService) { }


}