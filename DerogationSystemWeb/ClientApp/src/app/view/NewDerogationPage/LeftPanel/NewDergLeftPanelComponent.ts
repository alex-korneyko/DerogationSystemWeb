import { Component } from "@angular/core";
import { MaterialsApiService } from "../../../controllers/MaterialsApiService";
import { MaterialRequestModel } from "../../../model/requestModel/MaterialRequestModel";
import { WorkOrderApiService } from "../../../controllers/WorkOrderApiService";
import { WorkOrder } from "../../../model/domain/WorkOrder";
import { DerogationApiService } from "../../../controllers/DerogationApiService";

@Component({
    templateUrl: "NewDergLeftPanelComponent.html",
    styleUrls: ["../../../StyleSheet.css"],
    selector: "new-derg-left-panel"
})
export class NewDergLeftPanelComponent {

    itemsCountError = false;
    
    reasonMaxLength = 500;
    reasonLengthError = false;
    
    actionMaxLength = 500;
    actionLengthError = false;
    
    focusedAreaName = "Reason";
    charsLeft = this.reasonMaxLength;
    
    constructor(
        public derogationApiService: DerogationApiService,
        public materialsApiService: MaterialsApiService,
        public workOrderApiService: WorkOrderApiService
    ) { }

    addDerogationItemClick() {
        let errors = false;
        
        if (this.workOrderApiService.selectedWorkOrder == null 
            || this.workOrderApiService.selectedWorkOrder.orderNo == null 
            || this.workOrderApiService.selectedWorkOrder.orderNo === "") {
            
            errors = true;
            this.derogationApiService.validateErrors.workOrderValue = true;
            setTimeout(() => this.derogationApiService.validateErrors.workOrderValue = false, 1000);
        }
        
        if (this.derogationApiService.newItemForDerogation.reason === "") {
            console.log("Reason error!")
            errors = true;
            this.derogationApiService.validateErrors.itemReason = true;
            setTimeout(() => this.derogationApiService.validateErrors.itemReason = false, 1000);
        }

        if (this.derogationApiService.newItemForDerogation.action === "") {
            console.log("Action error!")
            errors = true;
            this.derogationApiService.validateErrors.itemAction = true;
            setTimeout(() => this.derogationApiService.validateErrors.itemAction = false, 1000);
        }
        
        if (errors) return;
        
        this.derogationApiService.newItemForDerogation.workOrder = this.workOrderApiService.selectedWorkOrder.orderNo;
        this.derogationApiService.newItemForDerogation.modelName = this.workOrderApiService.selectedWorkOrder.skdPartNo;
        this.derogationApiService.newItemForDerogation.productCode =
            this.workOrderApiService.selectedWorkOrder.material.description;

        this.derogationApiService.newItemForDerogation.partNo =
            this.materialsApiService.selectedMaterial.material.partNo;
        this.derogationApiService.newItemForDerogation.partNoDesc =
            this.materialsApiService.selectedMaterial.material.description;
        this.derogationApiService.newItemForDerogation.quantity =
            this.materialsApiService.selectedMaterial.quantity;

        this.derogationApiService.newItemForDerogation.aPartNo =
            this.materialsApiService.selectedAltMaterial.material.partNo;
        this.derogationApiService.newItemForDerogation.aPartNoDesc =
            this.materialsApiService.selectedAltMaterial.material.description;
        this.derogationApiService.newItemForDerogation.aQuantity =
            this.materialsApiService.selectedAltMaterial.quantity;

        this.derogationApiService.addCurrentItemToNewDerogation();

        this.clearDerogationItemForm();
    }

    clearDerogationItemForm() {
        this.workOrderApiService.selectedWorkOrder = new WorkOrder;
        this.materialsApiService.selectedMaterial = new MaterialRequestModel;
        this.materialsApiService.selectedAltMaterial = new MaterialRequestModel;
        this.derogationApiService.newItemForDerogation.reason = "";
        this.derogationApiService.newItemForDerogation.action = "";
    }

    releaseNewDergClick() {
        if (this.derogationApiService.newDerogation.derogationItems.length === 0) {
            this.derogationApiService.validateErrors.derogationItemsCount = true;
            setTimeout(() => this.derogationApiService.validateErrors.derogationItemsCount = false, 1000);
            return;
        }
        
        this.derogationApiService.sendNewDerogation();
    }
    
    reasonChange() {
        this.reasonLengthError = false;
        if (this.derogationApiService.newItemForDerogation.reason.length > this.reasonMaxLength) {
            this.derogationApiService.newItemForDerogation.reason =
                this.derogationApiService.newItemForDerogation.reason.substring(0, this.reasonMaxLength);
            this.reasonLengthError = true;
        }
        
        this.charsLeft = this.reasonMaxLength - this.derogationApiService.newItemForDerogation.reason.length;
        
        $("#reasonTextArea").val(this.derogationApiService.newItemForDerogation.reason)
    }
    
    actionChange() {
        this.actionLengthError = false;
        if (this.derogationApiService.newItemForDerogation.action.length > this.actionMaxLength) {
            this.derogationApiService.newItemForDerogation.action =
                this.derogationApiService.newItemForDerogation.action.substring(0, this.actionMaxLength);
            this.actionLengthError = true;
        }
        
        this.charsLeft = this.actionMaxLength - this.derogationApiService.newItemForDerogation.action.length;
        
        $("#actionTextArea").val(this.derogationApiService.newItemForDerogation.action);
    }

    receiveFocus(obj: string) {
        switch (obj) {
            case "reason":
                this.focusedAreaName = "Reason";
                this.charsLeft = this.reasonMaxLength - this.derogationApiService.newItemForDerogation.reason.length;
                break;
            case "action":
                this.focusedAreaName = "Action";
                this.charsLeft = this.actionMaxLength - this.derogationApiService.newItemForDerogation.action.length;
                break;
        }
    }
}