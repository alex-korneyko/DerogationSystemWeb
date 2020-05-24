import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginRequestModel } from "../model/requestModel/LoginRequestModel";
import { User } from "../model/domain/User";
import { WebsocketService } from '../model/services/WebsocketService';

@Injectable()
export class LoginApiService {

    public loggedInUserIsReceives: boolean;

    private apiUrl = "/api/auth";
    private user: User;
    private loginError: boolean;

    constructor(private http: HttpClient, private wsService: WebsocketService) {
        this.getAuthUser();
    }

    get loggedInUser(): User { return this.user; }
    get logInError(): boolean { return this.loginError; }

    login(data: LoginRequestModel) {
        this.http.post(this.apiUrl + "/login", data).subscribe((user: User) => {
            if (user == null) {
                this.loginError = true;
            }
            this.user = user;
            if (this.user != null && !this.wsService.isConnected) {
                this.wsService.connect();
            }
        });
        return this.user;
    }

    logout() {
        this.http.get(this.apiUrl + "/logout").subscribe(() => this.user = null);
        this.wsService.disconnect();
        this.loginError = false;
    }

    private getAuthUser() {
        
        this.http.get(this.apiUrl + "/user").subscribe((user: User) => {
            this.loggedInUserIsReceives = false;
            this.user = user;
            if (this.user != null && !this.wsService.isConnected) {
                this.wsService.connect();
            }
            this.loggedInUserIsReceives = true;
        });
    }
}