import { Component } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { LoginModel } from '../../../model/domain/LoginModel';
import { LoginApiService } from '../../../controllers/LoginApiService'
import { User } from "../../../model/domain/User";


@Component({
    templateUrl: "TopNavBarComponent.html",
    styleUrls: ["TopNavBarComponent.css"],
    selector: "top-navbar",
    providers: [LoginApiService]
})
export class TopNavBarComponent {

    loginModel = new LoginModel;
    user: User;
    userError: boolean;

    constructor(private loginApiService: LoginApiService, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loginApiService.getAuthUser().subscribe((user: User) => {
                    this.user = user;
                });
            }
        });
    }
    
    login() {
        this.loginApiService.login(this.loginModel).subscribe((user: User) => {
            this.userError = user == null;
            this.user = user;
            this.router.navigateByUrl(this.router.url);
        });
    }

    logout() {
        this.loginApiService.logout().subscribe(() => {
            this.user = null;
            this.router.navigateByUrl("/");
        });
    }

    loginDataOnChange() {
        this.userError = false;
    }
}