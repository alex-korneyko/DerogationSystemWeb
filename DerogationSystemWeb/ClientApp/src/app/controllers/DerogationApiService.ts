import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DerogationHeader } from "../model/domain/DerogationHeader";
import { DerogationDepartment } from "../model/domain/DerogationDepartment";
import { DerogationRequestModel } from "../model/requestModel/DerogationRequestModel";

@Injectable()
export class DerogationApiService {

    public derogationRequestModel = new DerogationRequestModel();

    public derogationList = new Array<DerogationHeader>();
    public derogationListIsLoaded = false;

    public currentDerogationIsLoaded = false;
    public currentDerogation: DerogationHeader;

    private apiUrl = "/api/derogations";

    constructor(private http: HttpClient) { }

    getDerogationList(requestModel: DerogationRequestModel) {
        this.currentDerogationIsLoaded = false;
        this.http.post(this.apiUrl + "/getLast/" + requestModel.lastCount, requestModel)
            .subscribe((data: DerogationHeader[]) => {
                this.derogationList = data;
                this.derogationListIsLoaded = true;
                console.log(this.derogationList);
            });
    }

    getDerogation(id: number) {
        this.http.get(this.apiUrl + "/getOne/" + id)
            .subscribe((data: DerogationHeader) => this.currentDerogation = data);
    }
}