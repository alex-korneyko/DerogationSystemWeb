import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DerogationHeader } from "../model/domain/DerogationHeader";
import { DerogationRequestModel } from "../model/requestModel/DerogationRequestModel";
import { ApprovalRequestModel } from "../model/requestModel/ApprovalRequestModel";

@Injectable()
export class DerogationApiService {

    derogationRequestModel: DerogationRequestModel;
    approvalRequestModel: ApprovalRequestModel;

    derogationListIsLoaded = false;
    private derogationList = new Array<DerogationHeader>();

    get derogations() {
        return this.derogationList.sort((derg1, derg2) => { return derg1.createdDate < derg2.createdDate ? 1 : -1 });
    }

    currentDerogationIsLoaded = false;
    currentDerogation: DerogationHeader = null;

    private apiUrl = "/api/derogations";

    constructor(private http: HttpClient) {
        this.derogationRequestModel = new DerogationRequestModel();
        this.approvalRequestModel = new ApprovalRequestModel();
    }

    getDerogationList() {
        this.derogationListIsLoaded = false;
        this.http.post(this.apiUrl + "/getLast", this.derogationRequestModel)
            .subscribe((data: DerogationHeader[]) => {
                this.derogationList = data;
                this.derogationListIsLoaded = true;

                this.derogationList.forEach(derogation => {
                    if (derogation.approved === "0") {
                        this.getDerogation(derogation.derogationId, false, true);
                    }
                });
            });
    }

    getDerogation(id: number, setAsCurrent: boolean, replaceInList: boolean) {
        this.currentDerogationIsLoaded = false;
        this.http.get(this.apiUrl + "/getOne/" + id)
            .subscribe((data: DerogationHeader) => {
                console.log(data);
                if (setAsCurrent) {
                    this.currentDerogation = data;
                }
                let index = this.getIndex(this.derogationList, data);
                if (replaceInList && index !== -1) {
                    this.derogationList.splice(index, 1, data);
                }
                this.currentDerogationIsLoaded = true;
            });
    }

    resetRequestModel() {
        this.derogationRequestModel = new DerogationRequestModel();
    }

    sendApprove() {
        this.currentDerogation.operators.forEach(operatorBox => {
            if (operatorBox.isNew) {
                this.approvalRequestModel.operators.push(operatorBox);
            }
        });
        this.currentDerogation.operators = [];
        console.log(this.approvalRequestModel);

        this.http.post(this.apiUrl + "/approveDerogation/" + this.currentDerogation.derogationId, this.approvalRequestModel)
            .subscribe((data: DerogationHeader) => {
                console.log("Response: ");
                console.log(data);
                this.currentDerogation = data;
            });
    }

    private getIndex(derogationList: Array<DerogationHeader>, derogation: DerogationHeader): number {

        for (let i = 0; i < derogationList.length; i++) {
            if (derogationList[i].derogationId === derogation.derogationId) {
                return i;
            }
        }

        return -1;
    }
}