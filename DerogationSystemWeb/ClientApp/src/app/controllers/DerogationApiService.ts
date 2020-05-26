import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DerogationHeader } from "../model/domain/DerogationHeader";
import { DerogationRequestModel } from "../model/requestModel/DerogationRequestModel";

@Injectable()
export class DerogationApiService {

    derogationRequestModel: DerogationRequestModel;

    derogationListIsLoaded = false;
    private derogationList = new Array<DerogationHeader>();

    get derogations() {
        return this.derogationList.sort((derg1, derg2) => { return derg1.createdDate < derg2.createdDate ? 1 : -1 });
    }

    currentDerogationIsLoaded = false;
    currentDerogation: DerogationHeader = null;

    private apiUrl = "/api/derogations";

    constructor(private http: HttpClient) {
        this.derogationRequestModel = new DerogationRequestModel();
    }

    getDerogationList() {
        this.derogationListIsLoaded = false;
        this.http.post(this.apiUrl + "/getLast", this.derogationRequestModel)
            .subscribe((data: DerogationHeader[]) => {
                this.derogationList = data;
                this.derogationListIsLoaded = true;

                this.derogationList.forEach(derogation => {
                    if (derogation.approved === "0") {
                        this.getDerogation(derogation.derogationId, false);
                    }
                });
            });
    }

    getDerogation(id: number, setAsCurrent: boolean) {
        this.currentDerogationIsLoaded = false;
        this.http.get(this.apiUrl + "/getOne/" + id)
            .subscribe((data: DerogationHeader) => {
                if (setAsCurrent) {
                    this.currentDerogation = data;
                }
                let index = this.getIndex(this.derogationList, data);
                if (index !== -1) {
                    this.derogationList.splice(index, 1, data);
                }
                this.currentDerogationIsLoaded = true;
            });
    }

    resetRequestModel() {
        this.derogationRequestModel = new DerogationRequestModel();
    }

    private getIndex(derogationList: Array<DerogationHeader>, derogation: DerogationHeader): number {

        for (let i = 0; i < derogationList.length; i++) {
            if (derogationList[i].derogationId === derogation.derogationId) {
                return i;
            }
        }

        return -1;
    }
}