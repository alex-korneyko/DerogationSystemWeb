import { Component, Input } from "@angular/core";
import { User } from "../../../model/domain/User";

@Component({
    selector: "user-form",
    templateUrl: "UserFormComponent.html"
})
export class UserFormComponent {
    @Input()
    user: User;
}