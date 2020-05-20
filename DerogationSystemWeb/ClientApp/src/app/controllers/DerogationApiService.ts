import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DerogationHeader } from "../model/domain/DerogationHeader";
import { DerogationDepartment } from "../model/domain/DerogationDepartment";
import { DerogationRequestModel } from "../model/domain/DerogationRequestModel";

@Injectable()
export class DerogationApiService {

    public derogationList = new Array<DerogationHeader>();
    public currentDerogation: DerogationHeader;

    private apiUrl = "/api/derogations";

    constructor(private http: HttpClient) { }

    getDerogationList(requestModel: DerogationRequestModel) {
        this.http.post(this.apiUrl, requestModel)
            .subscribe((data: DerogationHeader[]) => this.derogationList = data);
    }

    getDerogation(id: number) {
        this.http.get(this.apiUrl + "/getOne/" + id)
            .subscribe((data: DerogationHeader) => this.currentDerogation = data);
    }
}