"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Material_1 = require("../domain/Material");
var MaterialRequestModel = /** @class */ (function () {
    function MaterialRequestModel(material, quantity) {
        if (material === void 0) { material = new Material_1.Material(); }
        this.material = material;
        this.quantity = quantity;
    }
    return MaterialRequestModel;
}());
exports.MaterialRequestModel = MaterialRequestModel;
//# sourceMappingURL=MaterialRequestModel.js.map