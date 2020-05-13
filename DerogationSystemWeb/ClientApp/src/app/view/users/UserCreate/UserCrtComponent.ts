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
        this.apiService.saveUser(this.user).subscribe(() => this.router.navigateByUrl("/users"));
    }
}