"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Department = /** @class */ (function () {
    function Department(department, mAilStep, mandatory, ltimeAccess, dCostAccess, addDept, toBeAdded, onlyMail) {
        if (mAilStep === void 0) { mAilStep = 1; }
        if (mandatory === void 0) { mandatory = "0"; }
        if (ltimeAccess === void 0) { ltimeAccess = "0"; }
        if (dCostAccess === void 0) { dCostAccess = "0"; }
        if (addDept === void 0) { addDept = "0"; }
        if (toBeAdded === void 0) { toBeAdded = "0"; }
        if (onlyMail === void 0) { onlyMail = "0"; }
        this.department = department;
        this.mAilStep = mAilStep;
        this.mandatory = mandatory;
        this.ltimeAccess = ltimeAccess;
        this.dCostAccess = dCostAccess;
        this.addDept = addDept;
        this.toBeAdded = toBeAdded;
        this.onlyMail = onlyMail;
    }
    return Department;
}());
exports.Department = Department;
//# sourceMappingURL=Department.js.map