import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DerogationHeader } from "../model/domain/DerogationHeader";
import { DerogationDepartment } from "../model/domain/DerogationDepartment";
import { DerogationRequestModel } from "../model/requestModel/DerogationRequestModel";

@Injectable()
export class DerogationApiService {

    derogationRequestModel: DerogationRequestModel;

    derogationList = new Array<DerogationHeader>();
    derogationListIsLoaded = false;

    currentDerogationIsLoaded = false;
    currentDerogation: DerogationHeader;

    private apiUrl = "/api/derogations";

    constructor(private http: HttpClient) {
        this.derogationRequestModel = new DerogationRequestModel();
    }

    getDerogationList() {
        this.currentDerogationIsLoaded = false;
        this.http.post(this.apiUrl + "/getLast", this.derogationRequestModel)
            .subscribe((data: DerogationHeader[]) => {
                this.derogationList = data;
                this.derogationListIsLoaded = true;
            });
    }

    getDerogation(id: number) {
        this.http.get(this.apiUrl + "/getOne/" + id)
            .subscribe((data: DerogationHeader) => this.currentDerogation = data);
    }

    resetRequestModel() {
        this.derogationRequestModel = new DerogationRequestModel();
    }
}