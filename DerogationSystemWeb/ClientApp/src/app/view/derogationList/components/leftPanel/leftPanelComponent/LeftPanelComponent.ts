import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../../controllers/DerogationApiService";
import {LoginApiService} from "../../../../../controllers/LoginApiService";

@Component({
    selector: "left-panel",
    templateUrl: "./LeftPanelComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"]
})
export class LeftPanelComponent {

    constructor(private derogationApiService: DerogationApiService, public loginApiService: LoginApiService) { }

    applyClick() {
        this.derogationApiService.getDerogationList();
    }

    resetClick() {
        this.derogationApiService.resetRequestModel();
    }
}