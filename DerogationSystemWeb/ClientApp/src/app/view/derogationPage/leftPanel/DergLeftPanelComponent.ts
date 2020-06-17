import {Component} from "@angular/core";
import {DerogationApiService} from "../../../controllers/DerogationApiService";
import {ActivatedRoute} from "@angular/router";
import {LoginApiService} from "../../../controllers/LoginApiService";
import {DerogationDepartment} from "../../../model/domain/DerogationDepartment";

@Component({
    templateUrl: "./DergLeftPanelComponent.html",
    styleUrls: ["../../../StyleSheet.css"],
    selector: "derogation-left-panel"
})
export class DergLeftPanelComponent {

    id: number;

    constructor(public derogationApiService: DerogationApiService,
        private loginApiService: LoginApiService,
        private activatedRoute: ActivatedRoute) {

        this.id = this.activatedRoute.snapshot.params["id"];
        if (this.derogationApiService.currentDerogation === null || this.derogationApiService.currentDerogation.derogationId !== this.id) {
            this.derogationApiService.getDerogation(this.id, true, false);
        }
    }

    availableForActions(): boolean {
        let deptsForApproval = new Array<DerogationDepartment>();
        let minStep = 1000;
        let result = false;
        
        if (this.loginApiService.loggedInUser === undefined || 
                (this.loginApiService.loggedInUser.canApprove === "0" && this.loginApiService.loggedInUser.admin !== "1"))
            return false;

        if (this.derogationApiService.currentDerogationIsLoaded) {
            this.derogationApiService.currentDerogation.derogationDepartments.forEach(dept => {
                if (dept["approved"] === "0" && dept["rejected"] === "0" && dept["cancellationRequest"] === "0") {
                    if (dept["mailStep"] < minStep) {
                        deptsForApproval = [];
                        deptsForApproval.push(dept);
                        minStep = dept["mailStep"];
                    } else if (dept["mailStep"] === minStep) {
                        deptsForApproval.push(dept);
                    }
                }
            });

            deptsForApproval.forEach(dDept => {
                if (dDept.department === this.loginApiService.loggedInUser.department) {
                    result = true;
                }
            });

            if (this.derogationApiService.currentDerogation.cancelled === "1") {
                result = false;
            }
        }

        return result;
    }

    status(): string {
        if (this.derogationApiService.currentDerogation.approved === "1") {
            return "Approved";
        }
        if (this.derogationApiService.currentDerogation.cancelled === "1") {
            return "Cancelled";
        }
        return "Ongoing";
    }
}