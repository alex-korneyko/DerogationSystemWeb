import { Component } from "@angular/core";
import { DerogationApiService } from '../../../../controllers/DerogationApiService';
import { DerogationOperator } from '../../../../model/domain/DerogationOperator';
import { LoginApiService } from '../../../../controllers/LoginApiService';

@Component({
    templateUrl: "EngOperatorBoxComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "eng-operator-box"
})
export class EngOperatorBoxComponent {

    public operatorBoxItem = new DerogationOperator();

    constructor(public derogationApiService: DerogationApiService, public loginApiService: LoginApiService) { }

    addOperatorBoxItem() {
        let error = false;
        
        if (this.operatorBoxItem.stationName == null || this.operatorBoxItem .stationName == "") {
            this.derogationApiService.validateErrors.engOperatorBoxStation = true;
            setTimeout(() => this.derogationApiService.validateErrors.engOperatorBoxStation = false, 1000);
            error = true
        }
        
        if (this.operatorBoxItem.hc < 1) {
            this.derogationApiService.validateErrors.engOperatorBoxHc = true;
            setTimeout(() => this.derogationApiService.validateErrors.engOperatorBoxHc = false, 1000);
            error = true;
        }
        
        if (error) return;
        
        this.operatorBoxItem.isNew = true;
        this.operatorBoxItem.derogationId = this.derogationApiService.currentDerogation.derogationId;
        this.operatorBoxItem.derogationUser = this.loginApiService.loggedInUser.derogationUser;
        this.operatorBoxItem.insertedDate = new Date();
        console.log(this.operatorBoxItem);
        this.derogationApiService.currentDerogation.operators.push(this.operatorBoxItem);

        this.operatorBoxItem = new DerogationOperator();
    }
}