import { Component } from "@angular/core";
import {DerogationApiService} from "../../controllers/DerogationApiService";
import {FileApiService} from "../../controllers/FileApiService";
import {DerogationHeader} from "../../model/domain/DerogationHeader";

@Component({
    templateUrl: "DerogationListComponent.html"
})

export class DerogationListComponent{

    constructor(private derogationApiService: DerogationApiService, private fileApiService: FileApiService) {
        derogationApiService.newDerogation.derogationDocs.forEach(dergDoc => {
            fileApiService.deleteFile(dergDoc.id);
        })
        
        derogationApiService.newDerogation = new DerogationHeader();
    }
}