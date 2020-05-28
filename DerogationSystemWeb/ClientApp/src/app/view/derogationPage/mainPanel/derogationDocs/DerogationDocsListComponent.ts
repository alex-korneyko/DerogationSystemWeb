import { Component } from "@angular/core";
import { DerogationApiService } from  "../../../../controllers/DerogationApiService";

@Component({
    templateUrl: "DerogationDocsListComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "derogation-docs-list"
})
export class DerogationDocsListComponent {

    constructor(public derogationApiService: DerogationApiService) {}
}