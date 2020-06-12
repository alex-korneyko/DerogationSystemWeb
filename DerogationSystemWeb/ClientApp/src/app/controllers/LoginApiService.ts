import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginRequestModel } from "../model/requestModel/LoginRequestModel";
import { User } from "../model/domain/User";
import { WebsocketService } from '../model/services/WebsocketService';
import { LoginResponseModel } from "../model/responseModel/LoginResponseModel";

@Injectable()
export class LoginApiService {

    public loggedInUserIsReceives: boolean;

    private apiUrl = "/api/auth";
    private tokenKey = "accessToken";
    private user: User;
    private loginError: boolean;

    constructor(private http: HttpClient, private wsService: WebsocketService, private router: Router) {

        this.getAuthUser();
    }

    get loggedInUser(): User { return this.user; }
    set setLoggedInUser(user: User) {
        this.user = user;

        if (this.wsService.isConnected) {
            this.wsService.disconnect();
        }

        this.wsService.connect();
    } 

    get logInError(): boolean { return this.loginError; }
    set setLoginError(value: boolean) {
        this.loginError = value;
    }

    login(data: LoginRequestModel) {

        this.http.post(this.apiUrl + "/token", data).subscribe((response: LoginResponseModel) => {

            this.setLoggedInUser = response.user;
            sessionStorage.setItem(this.tokenKey, response.token);
            this.router.navigateByUrl("/");

            return this.user;
        }, err => {
                console.log(err.error.error);
                this.loginError = true;
                return null;
        });
    }

    logout() {

        sessionStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.tokenKey);
        this.user = null;
        this.wsService.disconnect();
        this.loginError = false;
    }

    private getAuthUser() {
        this.loggedInUserIsReceives = false;

        this.http.get(this.apiUrl + "/user").subscribe((user: User) => {

            if (user != null) {
                this.setLoggedInUser = user;
                this.http.get(this.apiUrl + "/refreshToken").subscribe((response: LoginResponseModel) => {
                    sessionStorage.setItem(this.tokenKey, response.token);
                    console.log("New token received");
                });
            }

            this.loggedInUserIsReceives = true;
        });
    }
}