import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../model/domain/LoginModel";
import { User } from "../model/domain/User";

@Injectable()
export class LoginApiService {

    private apiUrl = "/api/auth";
    private user: User;
    private loginError: boolean;

    constructor(private http: HttpClient) {
        this.getAuthUser();
    }

    get loggedInUser(): User { return this.user; }
    get logInError(): boolean { return this.loginError; }

    login(data: LoginModel) {
        this.http.post(this.apiUrl + "/login", data).subscribe((user: User) => {
            if (user == null) {
                this.loginError = true;
            }
            this.user = user;
        });
        return this.user;
    }

    logout() {
        this.http.get(this.apiUrl + "/logout").subscribe(() => this.user = null);
        this.loginError = false;
    }

    private getAuthUser() {
        this.http.get(this.apiUrl + "/user").subscribe((user: User) => this.user = user);
    }
}