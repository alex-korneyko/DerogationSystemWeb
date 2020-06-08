import { Component, Input } from "@angular/core";
import { Material } from  "../../../../../../model/domain/Material";
import { MaterialRequestModel } from  "../../../../../../model/requestModel/MaterialRequestModel";

@Component({
    templateUrl: "PartNumberRowComponent.html",
    styleUrls: ["../../../../../../StyleSheet.css"],
    selector: "partnumber-row"
})
export class PartNumberRowComponent {

    @Input() material: Material;
    @Input() materialRequestModel: MaterialRequestModel;
    @Input() windowIdentId: number;

    materialDblClick() {
        this.materialRequestModel.material = this.material;
        this.materialRequestModel.quantity = 1;

        // @ts-ignore
        $("#materialsModal_" + this.windowIdentId).modal("hide");
    }
}