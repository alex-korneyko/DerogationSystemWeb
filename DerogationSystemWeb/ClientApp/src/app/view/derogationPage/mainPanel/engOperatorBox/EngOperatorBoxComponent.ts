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
        this.operatorBoxItem.isNew = true;
        this.operatorBoxItem.derogationId = this.derogationApiService.currentDerogation.derogationId;
        this.operatorBoxItem.derogationUser = this.loginApiService.loggedInUser.derogationUser;
        this.operatorBoxItem.insertedDate = new Date();
        console.log(this.operatorBoxItem);
        this.derogationApiService.currentDerogation.operators.push(this.operatorBoxItem);

        this.operatorBoxItem = new DerogationOperator();
    }
}