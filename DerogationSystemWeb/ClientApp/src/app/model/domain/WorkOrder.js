"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Material_1 = require("./Material");
var WorkOrder = /** @class */ (function () {
    function WorkOrder(workOrderId, orderNo, orderDate, skdPartNo, material, target) {
        this.workOrderId = workOrderId;
        this.orderNo = orderNo;
        this.orderDate = orderDate;
        this.skdPartNo = skdPartNo;
        this.material = material;
        this.target = target;
        this.material = new Material_1.Material();
    }
    return WorkOrder;
}());
exports.WorkOrder = WorkOrder;
//# sourceMappingURL=WorkOrder.js.map