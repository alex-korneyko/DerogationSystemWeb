import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../../controllers/DerogationApiService";

@Component({
    selector: "date-range",
    templateUrl: "DateRangeComponent.html"
})
export class DateRangeComponent {

    constructor(public derogationApiService: DerogationApiService) {}

}