import { Component } from "@angular/core";
import { DerogationApiService } from "../../../controllers/DerogationApiService";
import { Router, ActivatedRoute} from "@angular/router";
 
@Component({
    templateUrl: "./DergLeftPanelComponent.html",
    styleUrls: ["../../../StyleSheet.css"],
    selector: "derogation-left-panel"
})
export class DergLeftPanelComponent {

    id: number;

    constructor(public derogationApiService: DerogationApiService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.id = this.activatedRoute.snapshot.params["id"];
        if (this.derogationApiService.currentDerogation === null || this.derogationApiService.currentDerogation.derogationId !== this.id) {
            this.derogationApiService.getDerogation(this.id, true, false);
        }
    }
}