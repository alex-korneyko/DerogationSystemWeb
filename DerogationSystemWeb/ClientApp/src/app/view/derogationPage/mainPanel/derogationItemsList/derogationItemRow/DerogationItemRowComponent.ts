import { Component, Input } from "@angular/core";
import { DerogationItem } from "../../../../../model/domain/DerogationItem";

@Component({
    templateUrl: "./DerogationItemRowComponent.html",
    styleUrls: ["./DerogationItemRowComponent.css"],
    selector: "derogation-item-row"
})
export class DerogationItemRowComponent {

    @Input()
    derogationItem: DerogationItem;
}