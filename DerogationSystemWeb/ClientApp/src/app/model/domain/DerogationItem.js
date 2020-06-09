"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DerogationItem = /** @class */ (function () {
    function DerogationItem(id, derogationId, workOrder, modelName, productCode, partNo, partNoDesc, aPartNo, aPartNoDesc, quantity, aQuantity, reason, action, supplier) {
        if (reason === void 0) { reason = ""; }
        if (action === void 0) { action = ""; }
        if (supplier === void 0) { supplier = ""; }
        this.id = id;
        this.derogationId = derogationId;
        this.workOrder = workOrder;
        this.modelName = modelName;
        this.productCode = productCode;
        this.partNo = partNo;
        this.partNoDesc = partNoDesc;
        this.aPartNo = aPartNo;
        this.aPartNoDesc = aPartNoDesc;
        this.quantity = quantity;
        this.aQuantity = aQuantity;
        this.reason = reason;
        this.action = action;
        this.supplier = supplier;
    }
    return DerogationItem;
}());
exports.DerogationItem = DerogationItem;
//# sourceMappingURL=DerogationItem.js.map