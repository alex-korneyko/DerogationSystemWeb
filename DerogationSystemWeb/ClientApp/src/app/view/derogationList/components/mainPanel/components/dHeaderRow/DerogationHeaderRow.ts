import { Component, Input } from "@angular/core";
import { DerogationHeader } from "../../../../../../model/domain/DerogationHeader";

@Component({
    selector: "derogation-row",
    templateUrl: "DerogationHeaderRow.html",
    styleUrls: ["./DerogationHeaderRow.css"]
})
export class DerogationHeaderRow {

    @Input() derogation: DerogationHeader;

}