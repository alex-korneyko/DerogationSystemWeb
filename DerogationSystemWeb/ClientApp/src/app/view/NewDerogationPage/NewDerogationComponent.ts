import { Component } from "@angular/core";
import { WorkOrderApiService } from "../../controllers/WorkOrderApiService";

@Component({
    templateUrl: "NewDerogationComponent.html",
    selector: "new-derogation"
})
export class NewDerogationComponent {

    constructor(public workOrderApiService: WorkOrderApiService) {}
}