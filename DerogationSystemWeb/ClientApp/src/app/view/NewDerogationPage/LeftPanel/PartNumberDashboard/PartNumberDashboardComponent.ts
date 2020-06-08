import { Component, Input } from "@angular/core";
import { MaterialRequestModel } from "../../../../model/requestModel/MaterialRequestModel";
import { MaterialsApiService } from "../../../../controllers/MaterialsApiService";

@Component({
    templateUrl: "PartNumberDashboardComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "partnumber-dashboard"
})
export class PartNumberDashboardComponent {

    @Input() dashboardName = "";
    @Input() materialRequestModel: MaterialRequestModel;

    windowIdentId: number;

    constructor(private materialsApiService: MaterialsApiService) {
        this.windowIdentId = Math.ceil(Math.random() * 1000000000);
    }

    openModalClick() {

        // @ts-ignore
        $("#materialsModal_" + this.windowIdentId).modal("show");
    }
}