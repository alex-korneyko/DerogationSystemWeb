"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DerogationHeader = /** @class */ (function () {
    function DerogationHeader(derogationId, createdDate, factoryDepartment, owner, author, ltime, slt, dcostP, dcostF, cancelled, approved, offline, cancellationReason, derogationDepartments, derogationItems) {
        if (derogationDepartments === void 0) { derogationDepartments = new Array(); }
        if (derogationItems === void 0) { derogationItems = new Array(); }
        this.derogationId = derogationId;
        this.createdDate = createdDate;
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
    }
    return DerogationHeader;
}());
exports.DerogationHeader = DerogationHeader;
//# sourceMappingURL=DerogationHeader.js.map