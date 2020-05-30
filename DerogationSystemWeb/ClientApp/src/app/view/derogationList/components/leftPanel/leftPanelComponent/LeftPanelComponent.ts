import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../../controllers/DerogationApiService";

@Component({
    selector: "left-panel",
    templateUrl: "./LeftPanelComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"]
})
export class LeftPanelComponent {

    constructor(private derogationApiService: DerogationApiService) { }

    applyClick() {
        this.derogationApiService.getDerogationList();
    }

    resetClick() {
        this.derogationApiService.resetRequestModel();
    }
}