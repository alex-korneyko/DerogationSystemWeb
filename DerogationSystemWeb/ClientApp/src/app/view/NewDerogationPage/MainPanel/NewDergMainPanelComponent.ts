import { Component } from "@angular/core";
import { DerogationApiService } from "../../../controllers/DerogationApiService";

@Component({
    templateUrl: "NewDergMainPanelComponent.html",
    selector: "new-derg-main-panel"
})
export class NewDergMainPanelComponent {

    constructor(public  derogationApiService: DerogationApiService) {}
}