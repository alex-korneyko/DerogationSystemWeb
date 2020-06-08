import { Component, Input } from "@angular/core";
import { DerogationInvolvedRequestModel } from "../../../../../model/requestModel/DerogationInvolvedRequestModel";

@Component({
    templateUrl: "DeptInvolvedRowComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "dept-involved-row"
})
export class DeptInvolvedRowComponent {

    @Input() departmentReqModel: DerogationInvolvedRequestModel;

}