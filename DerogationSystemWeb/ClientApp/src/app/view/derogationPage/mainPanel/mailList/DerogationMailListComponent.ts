import { Component } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";
import { UserApiService } from "../../../../controllers/UserApiService";
import { User } from "../../../../model/domain/User";

@Component({
    templateUrl: "DerogationMailListComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "derogation-mail-list"
})
export class DerogationMailListComponent {

    constructor(public derogationApiService: DerogationApiService, public userApiService: UserApiService) {
        userApiService.getUsers();
    }
}