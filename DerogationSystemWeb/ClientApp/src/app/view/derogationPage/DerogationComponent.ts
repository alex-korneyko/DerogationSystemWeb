import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DerogationApiService } from "../../controllers/DerogationApiService";
import { DerogationHeader } from "../../model/domain/DerogationHeader";

@Component({
    templateUrl: "DerogationComponent.html"
})
export class DerogationComponent {

    id: number;

    constructor(public derogationApiService: DerogationApiService, activatedRoute: ActivatedRoute, router: Router) {
        this.id = activatedRoute.snapshot.params["id"];
        if (this.derogationApiService.currentDerogation === null || this.derogationApiService.currentDerogation.derogationId !== this.id) {
            this.derogationApiService.getDerogation(this.id, true, false);
        }
    }
}