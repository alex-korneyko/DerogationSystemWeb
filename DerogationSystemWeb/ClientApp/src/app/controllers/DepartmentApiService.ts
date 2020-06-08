import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Department } from "../model/domain/Department";
import { DerogationInvolvedRequestModel } from "../model/requestModel/DerogationInvolvedRequestModel";

@Injectable()
export class DepartmentApiService {

    departments: Department[];
    deptsRequestModel = new Array<DerogationInvolvedRequestModel>();
    departmentsIsLoaded = false;

    private apiUrl = "/api/departments";

    constructor(private http: HttpClient) {}

    getDepartments() {
        this.departmentsIsLoaded = false;
        this.http.get(this.apiUrl).subscribe((data: Department[]) => {
            this.departments = data;
            data.forEach(dept => this.deptsRequestModel.push(new DerogationInvolvedRequestModel(dept, dept.mandatory)));
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