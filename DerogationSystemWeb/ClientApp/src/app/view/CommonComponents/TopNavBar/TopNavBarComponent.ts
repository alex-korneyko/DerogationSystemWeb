import { Component } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { LoginRequestModel } from "../../../model/requestModel/LoginRequestModel";
import { LoginApiService } from "../../../controllers/LoginApiService"


@Component({
    templateUrl: "TopNavBarComponent.html",
    styleUrls: ["TopNavBarComponent.css"],
    selector: "top-navbar"
})
export class TopNavBarComponent {

    loginModel = new LoginRequestModel;
//    user: User;
    userError: boolean;

    constructor(public loginApiService: LoginApiService, private router: Router) {}

    login() {
        this.loginApiService.login(this.loginModel);
        this.userError = this.loginApiService.loggedInUser == null;
    }

    logout() {
        this.loginApiService.logout();
        this.router.navigateByUrl("/");
    }

    loginDataOnChange() {
        this.userError = false;
    }
}