import { Component, Input } from "@angular/core"
import { DerogationOperator } from "../../../../../model/domain/DerogationOperator";
import { DerogationApiService } from '../../../../../controllers/DerogationApiService';

@Component({
    templateUrl: "OperatorRowComponent.html",
    styleUrls: ["../../../../../StyleSheet.css"],
    selector: "operator-row",
})
export class OperatorRowComponent {

    @Input() derogationOperator: DerogationOperator;

    constructor(public  derogationApiService: DerogationApiService) {}

    deleteOperatorClick() {

        let index = this.findIndex(this.derogationApiService.currentDerogation.operators, this.derogationOperator);
        if (index > -1) {
            this.derogationApiService.currentDerogation.operators.splice(index, 1);
        }
    }

    private findIndex(operators: DerogationOperator[], operator: DerogationOperator): number {
        for (let i = 0; i < operators.length; i++) {
            if (operators[i].insertedDate === operator.insertedDate) {
                return i;
            }
        }

        return -1;
    }
}