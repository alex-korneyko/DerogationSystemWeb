import { Injectable } from "@angular/core";
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

    updateDepartment(department: Department) {
        return this.http.put(this.apiUrl, department);
    }

    deleteDepartment(id: number) {
        return this.http.delete(this.apiUrl + "/" + id);
    }
}