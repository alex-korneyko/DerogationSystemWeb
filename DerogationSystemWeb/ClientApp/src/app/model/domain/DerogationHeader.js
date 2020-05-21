"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DerogationHeader = /** @class */ (function () {
    function DerogationHeader(derogationId, createdDate, factoryDepartment, author, ltime, slt, dcostP, dcostF, cancelled, approved, offline, cancellationReason, derogationDepartments) {
        if (derogationDepartments === void 0) { derogationDepartments = new Array(); }
        this.derogationId = derogationId;
        this.createdDate = createdDate;
        this.factoryDepartment = factoryDepartment;
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
    }
    return DerogationHeader;
}());
exports.DerogationHeader = DerogationHeader;
//# sourceMappingURL=DerogationHeader.js.map