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
            let trimmed = this.derogationDoc.docName.trimRight();
            let words: string[] = trimmed.split(".");

            let result = "";

            for (let i = 2; i < words.length; i++) {
                result += words[i] + ".";
            }

            return result.endsWith(".") ? result.slice(0, result.length - 1) : result;
        }

        return this.derogationDoc.docName;
    }
    
    getMimeType() {
        if (this.derogationDoc.fileType === null) {
            return "application";
        }
        
        let split = this.derogationDoc.fileType.split("/");
        if (split.length > 1) {
            return split[0];
        }
        return this.derogationDoc.fileType;
    }

    deleteDocClick() {
        this.fileApiService.deleteFile(this.derogationDoc.id);
    }
}