import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../../model/domain/User";
import { UserApiService } from "../../../controllers/UserApiService";

@Component({
    templateUrl: "UserCrtComponent.html"
})
export class UserCrtComponent {

    user = new User();

    constructor(private apiService: UserApiService, private router: Router) { }

    save() {
        if (this.user.userMailBase == undefined) {
            this.user.userMailBase = this.user.derogationUser;
        }
        this.apiService.saveUser(this.user).subscribe(() => this.router.navigateByUrl("/users"));
    }

    disabled() : boolean {
        return this.user.department === undefined || this.user.derogationUser === undefined || this.user.derogationUser === "";
    }
}