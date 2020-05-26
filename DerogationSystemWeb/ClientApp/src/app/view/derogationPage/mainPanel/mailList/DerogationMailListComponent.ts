import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "DerogationMailListComponent.html",
    selector: "derogation-mail-list"
})
export class DerogationMailListComponent {

    constructor(public derogationApiService: DerogationApiService) { }
}