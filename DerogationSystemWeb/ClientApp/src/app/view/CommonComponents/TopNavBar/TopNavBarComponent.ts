import { Component } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { LoginModel } from '../../../model/domain/LoginModel';
import { LoginApiService } from '../../../controllers/LoginApiService'


@Component({
    templateUrl: "TopNavBarComponent.html",
    styleUrls: ["TopNavBarComponent.css"],
    selector: "top-navbar"
})
export class TopNavBarComponent {

    loginModel = new LoginModel;
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