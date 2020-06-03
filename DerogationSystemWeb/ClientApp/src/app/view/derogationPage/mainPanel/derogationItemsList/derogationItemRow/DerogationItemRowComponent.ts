import { Component, Input } from "@angular/core";
import { DerogationItem } from "../../../../../model/domain/DerogationItem";

@Component({
    templateUrl: "./DerogationItemRowComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "derogation-item-row"
})
export class DerogationItemRowComponent {

    @Input()
    derogationItem: DerogationItem;

    @Input()
    disableActions = true;

    actionEditClick() {
        console.log("Edit click");
    }

    actionDeleteClick() {
        console.log("Delete click");
    }
}