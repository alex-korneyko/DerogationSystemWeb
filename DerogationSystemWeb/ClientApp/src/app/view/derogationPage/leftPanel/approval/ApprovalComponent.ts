import { Component, Input } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "ApprovalComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "approval-dashboard"
})
export class ApprovalComponent {

    constructor(public derogationApiService: DerogationApiService) { }

    @Input()
    disabled: boolean;

    approveClick() {
        this.derogationApiService.sendApprove();
    }
}