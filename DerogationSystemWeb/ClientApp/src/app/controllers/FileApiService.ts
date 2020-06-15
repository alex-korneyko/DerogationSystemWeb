import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DerogationApiService } from  "./DerogationApiService";
import { DerogationHeader } from  "../model/domain/DerogationHeader";

@Injectable()
export class FileApiService {

    private apiUrl = "/api/files";

    constructor(private http: HttpClient, private derogationApiService: DerogationApiService) { }

    deleteFile(fileId: number) {
        this.http.get(this.apiUrl + "/delete/" + fileId).subscribe((data: DerogationHeader) => {
            this.derogationApiService.currentDerogation = data;
        });
    }
}