"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApprovalRequestModel = /** @class */ (function () {
    function ApprovalRequestModel(userId, approveValue, needTraining, comment, operators) {
        if (operators === void 0) { operators = new Array(); }
        this.userId = userId;
        this.approveValue = approveValue;
        this.needTraining = needTraining;
        this.comment = comment;
        this.operators = operators;
        this.approveValue = "approve";
    }
    return ApprovalRequestModel;
}());
exports.ApprovalRequestModel = ApprovalRequestModel;
//# sourceMappingURL=ApprovalRequestModel.js.map