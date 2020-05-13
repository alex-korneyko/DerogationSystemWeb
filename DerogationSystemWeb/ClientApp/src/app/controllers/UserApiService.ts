import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/domain/User";

@Injectable()
export class UserApiService {

    private apiUrl = "/api/users";

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get(this.apiUrl);
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