import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Department } from "../model/domain/Department";
import { DerogationInvolvedRequestModel } from "../model/requestModel/DerogationInvolvedRequestModel";
import { LoginApiService } from "./LoginApiService";
import {WebsocketService} from "../model/services/WebsocketService";

@Injectable()
export class DepartmentApiService {

    private _departments: Department[];
    
    get departments(): Department[] {
        
        if (this._departments === undefined) return new Array<Department>()
        
        return this._departments.sort((dept1, dept2) => {
            if (dept1.mAilStep > dept2.mAilStep) return 1;
            if (dept1.mAilStep < dept2.mAilStep) return -1;
            return 0;
        });
    }

    deptsRequestModel = new Array<DerogationInvolvedRequestModel>();
    departmentsIsLoaded = false;

    private apiUrl = "/api/departments";

    constructor(private http: HttpClient, private loginApiService: LoginApiService, private wsService: WebsocketService) {
        
        this.wsService.addHandler<Department>("department", ((payload, actionType) => {

            let index = this._departments.findIndex(dept => dept.department === payload.department);

            if (index > -1) {
                this._departments.splice(index, 1, payload);
            } else {
                this._departments.push(payload);
            }
        }));
    }

    loadDepartments() {
        
        this.departmentsIsLoaded = false;
        this.http.get(this.apiUrl).subscribe((data: Department[]) => {
            data.sort((d1, d2) => {
                if (d1.mAilStep > d2.mAilStep) {
                    return 1;
                }
                if (d1.mAilStep < d2.mAilStep) {
                    return -1;
                }                
                return 0;
            })
            
            this._departments = data;
            this.deptsRequestModel = new Array<DerogationInvolvedRequestModel>();
            data.forEach(dept => this.deptsRequestModel.push(
                new DerogationInvolvedRequestModel(dept, dept.department !== this.loginApiService.loggedInUser.department ? dept.mandatory : "0")));
            this.departmentsIsLoaded = true;
        });
    }

    getDepartment(id: string) {
        return this.http.get(this.apiUrl + "/" + id);
    }

    saveDepartment(department: Department) {
        return this.http.post(this.apiUrl, department);
    }

    updateDepartment(edtDeptId: string, department: Department) {
        return this.http.put(this.apiUrl + "/" + edtDeptId, department);
    }

    deleteDepartment(id: string) {
        return this.http.delete(this.apiUrl + "/" + id);
    }
}