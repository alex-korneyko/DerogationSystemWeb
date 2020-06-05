import { Component } from "@angular/core";
import { MaterialsApiService } from "../../../controllers/MaterialsApiService";

@Component({
    templateUrl: "NewDergLeftPanelComponent.html",
    styleUrls: ["../../../StyleSheet.css"],
    selector: "new-derg-left-panel"
})
export class NewDergLeftPanelComponent {

    constructor(public materialsApiService: MaterialsApiService) { }

    releaseNewDergClick() {
        console.log(this.materialsApiService.selectedMaterial);
        console.log(this.materialsApiService.selectedAltMaterial);
    }
}