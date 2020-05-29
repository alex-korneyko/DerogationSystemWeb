import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "ApprovalComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "approval-dashboard"
})
export class ApprovalComponent {

    constructor(public derogationApiService: DerogationApiService) { }

    approveClick() {
        this.derogationApiService.sendApprove();
    }
}