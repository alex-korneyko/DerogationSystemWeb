import { Component } from "@angular/core";
import {DerogationApiService} from  "../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "DerogationItemsListComponent.html",
    selector: "derogation-items-list"
})
export class DerogationItemsListComponent {

    constructor(public derogationApiService: DerogationApiService) {}
}