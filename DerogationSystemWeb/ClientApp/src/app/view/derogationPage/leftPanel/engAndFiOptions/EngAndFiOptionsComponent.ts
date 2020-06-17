import { Component, OnInit } from "@angular/core";
import { DerogationApiService } from "../../../../controllers/DerogationApiService";
import {LoginApiService} from "../../../../controllers/LoginApiService";

@Component({
    templateUrl: "EngAndFiOptionsComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "eng-fi-options"
})
export class EngAndFiOptionsComponent implements OnInit{

    public ltime?: number;
    public slt?: number;
    public dcostP?: number;
    public dcostF?: number;

    constructor(public derogationApiService: DerogationApiService, public loginApiService: LoginApiService) {}

    ngOnInit(): void {
        this.ltime = this.derogationApiService.currentDerogation.ltime;
        this.slt = this.derogationApiService.currentDerogation.slt;
        this.dcostP = this.derogationApiService.currentDerogation.dcostP;
        this.dcostF = this.derogationApiService.currentDerogation.dcostF;
    }

    setValues() {
        this.derogationApiService.sendEngFi(this.ltime, this.slt, this.dcostP, this.dcostF);
    }

    resetForm() {
        this.ngOnInit();
    }
}