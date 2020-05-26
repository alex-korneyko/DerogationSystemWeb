import { Component } from "@angular/core";
import { DerogationApiService } from "../../../controllers/DerogationApiService";


@Component({
    templateUrl: "./DergMainPanelComponent.html",
    selector: "derogation-main-panel"
})
export class DergMainPanelComponent {

    constructor(derogationApiService: DerogationApiService) { }

}