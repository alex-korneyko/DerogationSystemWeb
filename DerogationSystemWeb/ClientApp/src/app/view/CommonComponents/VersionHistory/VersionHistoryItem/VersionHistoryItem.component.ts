import { Component, Input } from "@angular/core";
import {VersionHistoryItem} from "../../../../model/domain/VersionHistoryItem";

@Component({
    templateUrl: "VersionHistoryItem.component.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "version-history-item"
})
export class VersionHistoryItemComponent {
    
    @Input()
    item: VersionHistoryItem;
    
    id = "collapse_" +  Date.now();
    
    showClick() {
        // @ts-ignore
        $("#" + this.id).collapse('toggle');
    }
}