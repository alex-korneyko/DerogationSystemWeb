import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../../controllers/DerogationApiService";

@Component({
    selector: "date-range",
    templateUrl: "DateRangeComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"]
})
export class DateRangeComponent {

    constructor(public derogationApiService: DerogationApiService) {}

}