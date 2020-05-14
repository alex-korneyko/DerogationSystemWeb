"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, derogationUser, department, userMailBase, admin, canCreate, canApprove, inMail) {
        if (admin === void 0) { admin = "0"; }
        if (canCreate === void 0) { canCreate = "0"; }
        if (canApprove === void 0) { canApprove = "0"; }
        if (inMail === void 0) { inMail = "0"; }
        this.id = id;
        this.derogationUser = derogationUser;
        this.department = department;
        this.userMailBase = userMailBase;
        this.admin = admin;
        this.canCreate = canCreate;
        this.canApprove = canApprove;
        this.inMail = inMail;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map