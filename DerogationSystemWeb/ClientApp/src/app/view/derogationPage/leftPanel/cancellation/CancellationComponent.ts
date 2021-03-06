﻿import { Component, Input } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";
import { LoginApiService } from "../../../../controllers/LoginApiService";

@Component({
    templateUrl: "CancellationComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "cancel-dashboard"
})
export class CancellationComponent {

    public cancReasonMaxLength = 500;
    public cancType = "cancelReq";
    public cancReason = "";
    public reasonValidateError = false;

    @Input()
    disabled: boolean;

    constructor(private derogationApiService: DerogationApiService, private loginApiService: LoginApiService) {}

    cancelClick() {
        if (this.cancReason === undefined || this.cancReason === null) {
            this.reasonValidateError = true;
            return;
        }

        this.cancType = this.derogationApiService.currentDerogation.owner === this.loginApiService.loggedInUser.derogationUser
            ? "cancel"
            : "cancelReq";

        switch (this.cancType) {
        case "cancelReq":
            this.derogationApiService.sendCancelRequest(this.cancReason);
            break;
        case "cancel":
            this.derogationApiService.sendCancel(this.cancReason);
            break;
        default:
        }
        
        this.cancReason = "";
    }

    cancellationIsAllowed() {
        if (this.derogationApiService.currentDerogationIsLoaded) {
            return this.derogationApiService.currentDerogation.owner === this.loginApiService.loggedInUser.derogationUser
                && this.derogationApiService.currentDerogation.cancelled !== "1";
        }
        return false;
    }

    txtAreaChange() {
        this.reasonValidateError = false;

        if (this.cancReason.length > this.cancReasonMaxLength) {
            this.cancReason = this.cancReason.substring(0, this.cancReasonMaxLength);
            this.reasonValidateError = true;
        }
        
        $("#commentCancTextarea").val(this.cancReason);
    }
}