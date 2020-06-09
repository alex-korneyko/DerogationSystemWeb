"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DerogationHeader = /** @class */ (function () {
    function DerogationHeader(derogationId, createdDate, department, factoryDepartment, owner, author, ltime, slt, dcostP, dcostF, cancelled, approved, offline, cancellationReason, derogationDepartments, derogationItems, operators) {
        if (cancelled === void 0) { cancelled = "0"; }
        if (approved === void 0) { approved = "0"; }
        if (offline === void 0) { offline = "0"; }
        if (derogationDepartments === void 0) { derogationDepartments = new Array(); }
        if (derogationItems === void 0) { derogationItems = new Array(); }
        if (operators === void 0) { operators = new Array(); }
        this.derogationId = derogationId;
        this.createdDate = createdDate;
        this.department = department;
        this.factoryDepartment = factoryDepartment;
        this.owner = owner;
        this.author = author;
        this.ltime = ltime;
        this.slt = slt;
        this.dcostP = dcostP;
        this.dcostF = dcostF;
        this.cancelled = cancelled;
        this.approved = approved;
        this.offline = offline;
        this.cancellationReason = cancellationReason;
        this.derogationDepartments = derogationDepartments;
        this.derogationItems = derogationItems;
        this.operators = operators;
    }
    return DerogationHeader;
}());
exports.DerogationHeader = DerogationHeader;
//# sourceMappingURL=DerogationHeader.js.map