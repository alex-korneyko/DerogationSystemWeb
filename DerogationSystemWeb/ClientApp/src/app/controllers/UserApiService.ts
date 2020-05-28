import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/domain/User";

@Injectable()
export class UserApiService {

    public usersList: User[];
    public usersListIsReceived = false;

    private apiUrl = "/api/users";

    constructor(private http: HttpClient) { }

    getUsers() {
        const getResult = this.http.get(this.apiUrl);
        getResult.subscribe((data: User[]) => {
            this.usersList = data;
            this.usersListIsReceived = true;
        });

        return getResult;
    }

    getUser(id: number) {
        return this.http.get(this.apiUrl + "/" + id);
    }

    saveUser(user: User) {
        return this.http.post(this.apiUrl, user);
    }

    updateUser(user: User) {
        return this.http.put(this.apiUrl, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.apiUrl + "/" + id);
    }
}