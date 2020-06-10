import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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

    private httpOptions: any;

    constructor(private http: HttpClient, private wsService: WebsocketService) {
        const httpHeaders = new HttpHeaders()
            .append("Accept", "application/json")
            .append("Authorization", `Bearer ${sessionStorage.getItem(this.tokenKey)}`);

        this.httpOptions = {
            headers: httpHeaders
        }

        this.getAuthUser();
    }

    get loggedInUser(): User { return this.user; }

    get logInError(): boolean { return this.loginError; }

    login(data: LoginRequestModel) {
//        this.http.post(this.apiUrl + "/login", data).subscribe((user: User) => {
//            if (user == null) {
//                this.loginError = true;
//            }
//            this.user = user;
//            if (this.user != null && !this.wsService.isConnected) {
//                this.wsService.connect();
//            }
//        });
//        return this.user;


        this.http.post(this.apiUrl + "/token", data, this.httpOptions).subscribe(response => {

            if (response["user"] == null) {
                this.loginError = true;
                return null;
            }

            console.log(response);

            this.user = response["user"];
            sessionStorage.setItem(this.tokenKey, response["token"]);

            return this.user;
        });
    }

    logout() {
//        this.http.get(this.apiUrl + "/logout").subscribe(() => this.user = null);

        sessionStorage.removeItem(this.tokenKey);
        this.wsService.disconnect();
        this.loginError = false;
    }

    private getAuthUser() {

        console.log(this.httpOptions);

        this.http.get(this.apiUrl + "/user", this.httpOptions).subscribe(user => {
            this.loggedInUserIsReceives = false;

            console.log(user);

            if (user != null) {
                if (!this.wsService.isConnected) {
                    this.wsService.connect();
                }
                //TODO
                this.user = user;
                console.log(this.user);
            }

            this.loggedInUserIsReceives = true;
        });
    }
}