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

    async getDerogationList() {
        this.derogationListIsLoaded = false;

        if (this.derogationRequestModel.workOrder === null) this.derogationRequestModel.workOrder = undefined;
        if (this.derogationRequestModel.derogationId === null) this.derogationRequestModel.derogationId = undefined;

        await this.http.post(this.apiUrl + "/getLast", this.derogationRequestModel)
            .subscribe((data: DerogationHeader[]) => {
                this.derogationList = data;
                this.derogationListIsLoaded = true;

                let notApprovedDerogations = new Array<number>()
                this.derogationList.forEach(derogation => {
                    if (derogation.approved === "0") {
                        notApprovedDerogations.push(derogation.derogationId);
                    }
                });
                this.getDerogationsSet(notApprovedDerogations);
            });
    }
    
    async getDerogationsSet(derogationsIds: Array<number>) {
        await this.http.post(this.apiUrl + "/getSet", derogationsIds)
            .subscribe((data: DerogationHeader[]) => {
                data.forEach(derg => {
                    let index = this.derogationList
                        .findIndex(dergInCurrList => dergInCurrList.derogationId === derg.derogationId);
                    
                    if (index === -1) {
                        this.derogationList.push(derg);
                    } else {
                        this.derogationList.splice(index, 1, derg);
                    }
                });
            });
    }

    async getDerogation(id: number, setAsCurrent: boolean, replaceInList: boolean) {
        this.currentDerogationIsLoaded = false;
        await this.http.get(this.apiUrl + "/getOne/" + id)
            .subscribe((data: DerogationHeader) => {
                if (setAsCurrent) {
                    this.currentDerogation = data;
                }
                let index = this.derogationList.findIndex(dergInList => dergInList.derogationId === data.derogationId);
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

        this.http.post(this.apiUrl + "/new", this.newDerogation).subscribe((data: DerogationHeader) => {
            this.derogationList.push(data);
            this.newDerogation = new DerogationHeader();
            this.router.navigateByUrl("/derogations");
        });
    }
}