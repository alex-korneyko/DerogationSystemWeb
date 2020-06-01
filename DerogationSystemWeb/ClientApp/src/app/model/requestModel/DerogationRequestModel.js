"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestDerogationStatus_1 = require("../requestModel/RequestDerogationStatus");
var DerogationRequestModel = /** @class */ (function () {
    function DerogationRequestModel() {
        this.useDateRange = false;
        this.lastCount = 100;
        this.derogationId = undefined;
        this.workOrder = undefined;
        this.modelName = "";
        this.partNumber = "";
        this.departmentOwner = RequestDerogationStatus_1.RequestDerogationStatus[RequestDerogationStatus_1.RequestDerogationStatus.All];
        this.byStatus = "All";
        this.useDateRange = false;
        this.toDate = this.formatDate(new Date());
        this.fromDate = this.formatDate(this.minusDate(new Date(), 30));
    }
    DerogationRequestModel.prototype.minusDate = function (date, days) {
        date.setDate(date.getDate() - days);
        return date;
    };
    DerogationRequestModel.prototype.formatDate = function (date) {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        var day = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
        var result = year + "-" + month + "-" + day;
        return result;
    };
    return DerogationRequestModel;
}());
exports.DerogationRequestModel = DerogationRequestModel;
//# sourceMappingURL=DerogationRequestModel.js.map