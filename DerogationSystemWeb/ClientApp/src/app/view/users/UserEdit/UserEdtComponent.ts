import { Component, OnInit } from "@angular/core";
import { User } from "../../../model/domain/User";
import { Router, ActivatedRoute } from "@angular/router";
import { UserApiService } from "../../../controllers/UserApiService";

@Component({
    templateUrl: "UserEdtComponent.html"
})
export class UserEdtComponent implements OnInit {

    id: number;
    user: User;
    loaded: boolean = false;

    constructor(private apiService: UserApiService, private router: Router, activatedRoute: ActivatedRoute) {
        this.id = activatedRoute.snapshot.params["id"];
    }

    ngOnInit(): void {
        if (this.id) {
            this.apiService.getUser(this.id)
                .subscribe((data: User) => {
                    this.user = data;
                    if (this.user !== null) this.loaded = true;
                });
        }
    }

    save() {
        this.apiService.updateUser(this.user).subscribe(() => this.router.navigateByUrl("/users"));
    }
}