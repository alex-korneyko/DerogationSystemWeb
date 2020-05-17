import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginModel } from '../../../model/domain/LoginModel';
import { LoginApiService } from '../../../controllers/LoginApiService'


@Component({
    templateUrl: "TopNavBarComponent.html",
    selector: "top-navbar",
    providers: [LoginApiService]
})

export class TopNavBarComponent {

    loginModel = new LoginModel;

    constructor(private loginApiService: LoginApiService, private router: Router) {}

    login() {
        this.loginApiService.login(this.loginModel).subscribe(() => this.router.navigateByUrl(""));
    }
}