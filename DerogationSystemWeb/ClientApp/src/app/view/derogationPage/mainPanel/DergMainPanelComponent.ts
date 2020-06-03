import { Component } from "@angular/core";
import { DerogationApiService } from "../../../controllers/DerogationApiService";
import { DerogationItem } from "../../../model/domain/DerogationItem";


@Component({
    templateUrl: "./DergMainPanelComponent.html",
    selector: "derogation-main-panel"
})
export class DergMainPanelComponent {

    constructor(public derogationApiService: DerogationApiService) {}

}