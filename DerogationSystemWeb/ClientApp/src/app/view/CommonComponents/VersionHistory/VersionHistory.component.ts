import { Component, OnInit } from "@angular/core";
import {VersionHistoryItem} from "../../../model/domain/VersionHistoryItem";

@Component({
    templateUrl: "VersionHistory.component.html",
    styleUrls: ["../../../StyleSheet.css"],
    selector: "version-history"
})
export class VersionHistoryComponent implements OnInit{
    
    versionHistoryItemsList = new Array<VersionHistoryItem>();

    ngOnInit(): void {
        
        this.versionHistoryItemsList.push(new VersionHistoryItem(
            "1.1.0.beta",
            "26.06.2020",
            "Implemented the ability to add operators immediately when creating a derogation"
        ));
    }
    
    click() {
        // @ts-ignore
        $("#collapseThree").collapse("toggle");
    }
    
    
}