import { Component, Input } from "@angular/core";
import {DerogationApiService} from  "../../../../controllers/DerogationApiService";
import { DerogationItem } from "../../../../model/domain/DerogationItem";

@Component({
    templateUrl: "DerogationItemsListComponent.html",
    styleUrls: ["DerogationItemsListComponent.css", "../../../../StyleSheet.css"],
    selector: "derogation-items-list"
})
export class DerogationItemsListComponent {

    @Input() dergItems: DerogationItem[];
    @Input() disableActions = true;

    constructor(public derogationApiService: DerogationApiService) { }

}