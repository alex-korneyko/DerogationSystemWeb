"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DerogationOperator = /** @class */ (function () {
    function DerogationOperator(id, derogationId, stationName, hc, derogationUser, insertedDate, isNew) {
        if (isNew === void 0) { isNew = false; }
        this.id = id;
        this.derogationId = derogationId;
        this.stationName = stationName;
        this.hc = hc;
        this.derogationUser = derogationUser;
        this.insertedDate = insertedDate;
        this.isNew = isNew;
    }
    return DerogationOperator;
}());
exports.DerogationOperator = DerogationOperator;
//# sourceMappingURL=DerogationOperator.js.map