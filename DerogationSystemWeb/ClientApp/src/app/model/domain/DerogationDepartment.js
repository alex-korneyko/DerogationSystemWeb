"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DerogationDepartment = /** @class */ (function () {
    function DerogationDepartment(derogationId, derogationHeader, department, factoryDepartment, mailStep, training, approved, comment, rejected, cancellationRequest, cancellationReason, derogationUser, user, operationDate, checked) {
        if (training === void 0) { training = "0"; }
        if (approved === void 0) { approved = "0"; }
        if (comment === void 0) { comment = ""; }
        if (rejected === void 0) { rejected = "0"; }
        if (cancellationRequest === void 0) { cancellationRequest = "0"; }
        if (cancellationReason === void 0) { cancellationReason = ""; }
        if (checked === void 0) { checked = "1"; }
        this.derogationId = derogationId;
        this.derogationHeader = derogationHeader;
        this.department = department;
        this.factoryDepartment = factoryDepartment;
        this.mailStep = mailStep;
        this.training = training;
        this.approved = approved;
        this.comment = comment;
        this.rejected = rejected;
        this.cancellationRequest = cancellationRequest;
        this.cancellationReason = cancellationReason;
        this.derogationUser = derogationUser;
        this.user = user;
        this.operationDate = operationDate;
        this.checked = checked;
    }
    return DerogationDepartment;
}());
exports.DerogationDepartment = DerogationDepartment;
//# sourceMappingURL=DerogationDepartment.js.map