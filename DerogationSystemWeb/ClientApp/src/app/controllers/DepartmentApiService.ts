﻿import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Department } from "../model/domain/Department";

@Injectable()
export class DepartmentApiService {

    private apiUrl = "/api/departments";

    constructor(private http: HttpClient) { }

    getDepartments() {
        return this.http.get(this.apiUrl);
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