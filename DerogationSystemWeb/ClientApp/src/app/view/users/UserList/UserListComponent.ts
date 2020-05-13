import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UserApiService } from "../../../controllers/UserApiService";
import { User } from "../../../model/domain/User";

@Component({
    templateUrl: "UserListComponent.html"
})

export class UserListComponent implements OnInit{

    users: User[];
    usersTotalList: User[] = new Array<User>();
    @Input() filter: string;

    constructor(private apiService: UserApiService, private router: Router) { }

    ngOnInit(): void {
        this.apiService.getUsers().subscribe((data: User[]) => {
            this.users = data;
            this.usersTotalList.push(...data);
        });
    }

    addNewClick() {

    }

    filterChange() {
        this.users = this.usersTotalList.filter((user: User) => user.derogationUser.indexOf(this.filter, 0) > -1);
    }
}