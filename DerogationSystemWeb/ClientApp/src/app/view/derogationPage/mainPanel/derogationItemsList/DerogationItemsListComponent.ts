import { Component } from "@angular/core";
import {DerogationApiService} from  "../../../../controllers/DerogationApiService";
import { DerogationItem } from "../../../../model/domain/DerogationItem";
import { DerogationDepartment } from "../../../../model/domain/DerogationDepartment";

@Component({
    templateUrl: "DerogationItemsListComponent.html",
    styleUrls: ["DerogationItemsListComponent.css"],
    selector: "derogation-items-list"
})
export class DerogationItemsListComponent {

    constructor(public derogationApiService: DerogationApiService) { }

}