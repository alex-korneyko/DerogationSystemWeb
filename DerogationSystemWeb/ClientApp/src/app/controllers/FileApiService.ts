import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DerogationApiService } from  "./DerogationApiService";
import { DerogationHeader } from  "../model/domain/DerogationHeader";

@Injectable()
export class FileApiService {

    private apiUrl = "/api/files";

    constructor(private http: HttpClient, private derogationApiService: DerogationApiService) { }
    
    uploadFile(formData: FormData, derogationId: number) {
        let type = (formData.get("uploadFile") as File).type;
        return  this.http.post(
            `${this.apiUrl}/upload/${derogationId}`,
            formData,
            {
                reportProgress: true,
                observe: "events"
            });
    }

    deleteFile(fileId: number) {
        this.http.get(this.apiUrl + "/delete/" + fileId).subscribe((data: DerogationHeader) => {
            if (data.derogationId === 0) {
                let index = this.derogationApiService.newDerogation.derogationDocs
                    .findIndex(dergDoc => dergDoc.id === fileId);

                if (index > -1) {
                    this.derogationApiService.newDerogation.derogationDocs.splice(index, 1);
                }
            } else {
                this.derogationApiService.currentDerogation = data;
            }
        });
    }
}