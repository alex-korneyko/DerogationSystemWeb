import { Component, OnInit } from "@angular/core";
import { WorkOrderApiService } from "../../controllers/WorkOrderApiService";
import { MaterialsApiService } from "../../controllers/MaterialsApiService";

@Component({
    templateUrl: "NewDerogationComponent.html",
    selector: "new-derogation"
})
export class NewDerogationComponent implements OnInit {

    constructor(public materialsApiService: MaterialsApiService) {}

    ngOnInit(): void {
        this.materialsApiService.getMaterials();
    }
}