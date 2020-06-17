import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UserApiService } from "../../../controllers/UserApiService";
import { User } from "../../../model/domain/User";
import {LoginApiService} from "../../../controllers/LoginApiService";

@Component({
    templateUrl: "UserListComponent.html"
})

export class UserListComponent implements OnInit{

    users = new Array<User>();
    usersTotalList = new Array<User>();
    @Input() filter: string;

    constructor(
        private apiService: UserApiService,
        public loginApiService: LoginApiService,
        private router: Router) { }

    ngOnInit(): void {
        this.apiService.getUsers().subscribe((data: User[]) => {
            this.users.splice(0, this.users.length, ...data);
            this.usersTotalList.splice(0, this.usersTotalList.length, ...data);
        });
    }

    addNewClick() {
        this.router.navigateByUrl("/users/newUser");
    }

    deleteUser(id: number) {
        this.filter = "";
        this.apiService.deleteUser(id).subscribe(() => this.ngOnInit());
    }

    filterChange() {
        this.users = this.usersTotalList.filter((user: User) => user.derogationUser.indexOf(this.filter, 0) > -1);
    }
}