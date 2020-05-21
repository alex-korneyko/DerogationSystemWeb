"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestDerogationStatus_1 = require("../domain/RequestDerogationStatus");
var DerogationRequestModel = /** @class */ (function () {
    function DerogationRequestModel() {
        this.lastCount = 100;
        this.derogationId = 0;
        this.workOrder = 0;
        this.modelName = "";
        this.partNumber = "";
        this.departmentOwner = "";
        this.byStatus = RequestDerogationStatus_1.RequestDerogationStatus[RequestDerogationStatus_1.RequestDerogationStatus.All];
        this.fromDate = this.minusDate(new Date(), 30);
        this.toDate = new Date();
    }
    DerogationRequestModel.prototype.minusDate = function (date, days) {
        date.setDate(date.getDate() - days);
        return date;
    };
    return DerogationRequestModel;
}());
exports.DerogationRequestModel = DerogationRequestModel;
//# sourceMappingURL=DerogationRequestModel.js.map