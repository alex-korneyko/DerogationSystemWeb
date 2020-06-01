import { Component, Input } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";
import { LoginApiService } from "../../../../controllers/LoginApiService";

@Component({
    templateUrl: "CancellationComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "cancel-dashboard"
})
export class CancellationComponent {

    public cancType = "cancelReq";
    public cancReason: string;

    @Input()
    disabled: boolean;

    constructor(private derogationApiService: DerogationApiService, private loginApiService: LoginApiService) {}

    cancelClick() {
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
    }

    cancellationIsAllowed() {
        if (this.derogationApiService.currentDerogationIsLoaded) {
            return this.derogationApiService.currentDerogation.owner === this.loginApiService.loggedInUser.derogationUser
                && this.derogationApiService.currentDerogation.cancelled !== "1";
        }
        return false;
    }
}