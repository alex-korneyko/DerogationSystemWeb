import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from '../model/domain/LoginModel';


@Injectable()
export class LoginApiService {

    private apiUrl = "/api/auth";

    constructor(private http: HttpClient) { }

    login(data: LoginModel) {
        return this.http.post(this.apiUrl + "/login", data);
    }

    logout() {
        return this.http.get(this.apiUrl + "/logout");
    }

    getAuthUser() {
        return this.http.get(this.apiUrl + "/user");
    }
}