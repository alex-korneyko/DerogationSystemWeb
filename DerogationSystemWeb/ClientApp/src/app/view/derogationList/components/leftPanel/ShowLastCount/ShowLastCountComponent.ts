import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../../controllers/DerogationApiService";

@Component({
    selector: "show-last-count",
    styleUrls: ["../../../../../StyleSheet.css"],
    templateUrl: "ShowLastCountComponent.html"
})
export class ShowLastCountComponent {

    constructor(public derogationApiService: DerogationApiService) { }

}