"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, derogationUser, userMailBase, admin, canCreate, canApprove, inMail) {
        this.id = id;
        this.derogationUser = derogationUser;
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