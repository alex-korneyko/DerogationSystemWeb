import { Component, Input } from "@angular/core";
import { MaterialsApiService } from  "../../../../../controllers/MaterialsApiService";
import { MaterialRequestModel } from  "../../../../../model/requestModel/MaterialRequestModel";

@Component({
    templateUrl: "PartNumberListComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "partnumber-list"
})
export class PartNumberListComponent {

    constructor(public  materialsApiService: MaterialsApiService) { }

    @Input() materialRequestModel: MaterialRequestModel;
    @Input() windowIdentId: number;
}