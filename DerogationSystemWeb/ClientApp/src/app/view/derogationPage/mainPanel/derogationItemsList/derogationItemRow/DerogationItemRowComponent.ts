import { Component, Input } from "@angular/core";
import { DerogationItem } from "../../../../../model/domain/DerogationItem";
import {DerogationApiService} from "../../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "./DerogationItemRowComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "derogation-item-row"
})
export class DerogationItemRowComponent {
    
    constructor(private derogationApiService: DerogationApiService) {
    }

    @Input()
    derogationItem: DerogationItem;

    @Input()
    disableActions = true;
    
    @Input()
    indexInList: number

    actionEditClick() {
        console.log("Edit click for " + this.indexInList);
    }

    actionDeleteClick() {
        console.log("Delete click for" + this.indexInList);
        this.derogationApiService.newDerogation.derogationItems.splice(this.indexInList, 1);
    }
}