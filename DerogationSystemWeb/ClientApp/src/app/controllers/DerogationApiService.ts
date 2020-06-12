import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DerogationHeader } from "../model/domain/DerogationHeader";
import { DerogationRequestModel } from "../model/requestModel/DerogationRequestModel";
import { ApprovalRequestModel } from "../model/requestModel/ApprovalRequestModel";
import { DerogationItem } from "../model/domain/DerogationItem";
import { LoginApiService } from "./LoginApiService";
import { DepartmentApiService } from "./DepartmentApiService";
import { DerogationDepartment } from "../model/domain/DerogationDepartment";
import { Router } from "@angular/router";

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

    newDerogation: DerogationHeader;
    newItemForDerogation: DerogationItem;
    itemsListForNewDerogation = new Array<DerogationItem>();

    private apiUrl = "/api/derogations";

    constructor(private http: HttpClient, private loginApiService: LoginApiService, private departmentApiService: DepartmentApiService, private router: Router) {
        this.derogationRequestModel = new DerogationRequestModel();
        this.approvalRequestModel = new ApprovalRequestModel();
        this.newDerogation = new DerogationHeader();
        this.newItemForDerogation = new DerogationItem();
    }

    getDerogationList() {
        this.derogationListIsLoaded = false;

        if (this.derogationRequestModel.workOrder === null) this.derogationRequestModel.workOrder = undefined;
        if (this.derogationRequestModel.derogationId === null) this.derogationRequestModel.derogationId = undefined;

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
                this.currentDerogation = data;
            });
    }

    sendCancelRequest(reason: string) {
        this.http.post(this.apiUrl + "/cancellationRequest/" + this.currentDerogation.derogationId, {"reason": reason })
            .subscribe((data: DerogationHeader) => {
                this.currentDerogation = data;
            });
    }

    sendCancel(reason: string) {
        console.log("Reason: " + reason);
        this.http.post(this.apiUrl + "/cancellation/" + this.currentDerogation.derogationId, { "reason": reason })
            .subscribe((data: DerogationHeader) => {
                this.currentDerogation = data;
            });
    }

    sendEngFi(ltime: number, slt: number, dcostP: number, dcostF: number) {
        this.http.post(this.apiUrl + `/setEngFi/${this.currentDerogation.derogationId}`, { "ltime": ltime, "slt": slt, "dcostP": dcostP, "dcostF": dcostF })
            .subscribe((data: DerogationHeader) => {
                this.currentDerogation = data;
            });
    }

    addCurrentItemToNewDerogation() {

        this.currentDerogationIsLoaded = true;
        const clone = Object.assign({}, this.newItemForDerogation);
        this.newDerogation.derogationItems.push(clone);
        this.newItemForDerogation = new DerogationItem();
        console.log(this.newDerogation);
    }

    sendNewDerogation() {
        this.newDerogation.owner = this.loginApiService.loggedInUser.derogationUser;
        this.newDerogation.department = this.loginApiService.loggedInUser.department;

        this.departmentApiService.deptsRequestModel.forEach(deptReqModel => {
            if (deptReqModel.chosen === "1") {
                const derogationDepartment = new DerogationDepartment();
                derogationDepartment.department = deptReqModel.department.department;
                derogationDepartment.mailStep = deptReqModel.department.mAilStep;
                this.newDerogation.derogationDepartments.push(derogationDepartment);
            }
        });

        console.log("Send...");
        console.log(this.newDerogation);

        this.http.post(this.apiUrl + "/new", this.newDerogation).subscribe((data: DerogationHeader) => {
            console.log("Receive...");
            console.log(data);
            this.derogationList.push(data);
            this.newDerogation = new DerogationHeader();
            this.router.navigateByUrl("/derogations");
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