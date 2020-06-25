import { Component, Input } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "ApprovalComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "approval-dashboard"
})
export class ApprovalComponent {

    commentMaxLength = 500;
    comment = "";
    commentLengthError = false;
    
    constructor(public derogationApiService: DerogationApiService) { }

    @Input()
    disabled: boolean;

    approveClick() {
        this.derogationApiService.approvalRequestModel.comment = this.comment;
        this.derogationApiService.sendApprove();
    }
    
    commentChange() {
        this.commentLengthError = false;
        
        if (this.comment.length > this.commentMaxLength) {
            this.comment = this.comment.substring(0, this.commentMaxLength);
            this.commentLengthError = true;
        }
        
        $("#commentApprTextarea").val(this.comment);
    }
}