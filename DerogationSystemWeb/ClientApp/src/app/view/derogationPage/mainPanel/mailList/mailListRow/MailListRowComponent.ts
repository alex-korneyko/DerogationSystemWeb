import { Component, Input } from "@angular/core";
import { User } from "../../../../../model/domain/User";

@Component({
    templateUrl: "MailListRowComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "mail-list-row"
})
export class MailListRowComponent {

    @Input() user: User;
}