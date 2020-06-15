import { Component, Input } from "@angular/core";
import { DerogationDoc } from  "../../../../../model/domain/DerogationDoc";
import { LoginApiService } from "../../../../../controllers/LoginApiService";
import { FileApiService } from "../../../../../controllers/FileApiService";

@Component({
    templateUrl: "DerogationDocRowComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "derogation-doc-row"
})
export class DerogationDocRowComponent {

    @Input()
    derogationDoc: DerogationDoc;

    constructor(private  fileApiService: FileApiService, public loginApiService: LoginApiService) {}

    getDocName(): string {

        if (this.derogationDoc.docName.startsWith("guid")) {
            let words: string[] = this.derogationDoc.docName.split(".");

            let result = "";

            for (var i = 2; i < words.length; i++) {
                result += words[i] + ".";
            }

            return result.slice(0, result.length - 2);
        }

        return this.derogationDoc.docName;
    }

    deleteDocClick() {
        this.fileApiService.deleteFile(this.derogationDoc.id);
    }
}