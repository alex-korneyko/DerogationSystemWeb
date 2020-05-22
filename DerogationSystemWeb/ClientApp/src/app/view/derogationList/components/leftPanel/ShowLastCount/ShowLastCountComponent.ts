import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../../controllers/DerogationApiService";

@Component({
    selector: "show-last-count",
    templateUrl: "ShowLastCountComponent.html"
})
export class ShowLastCountComponent {

    constructor(public derogationApiService: DerogationApiService) { }

}