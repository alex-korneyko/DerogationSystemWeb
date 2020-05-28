import { Component, OnInit } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";
import { DerogationRequestModel } from "../../../../model/requestModel/DerogationRequestModel";

@Component({
    selector: "main-panel",
    templateUrl: "MainPanelComponent.html",
    styleUrls: ["../../../../StyleSheet.css"]
})
export class MainPanelComponent implements OnInit {

    constructor(public apiService: DerogationApiService) { }

    ngOnInit(): void {
        let requestModel = new DerogationRequestModel();

        this.apiService.getDerogationList();
    }
}