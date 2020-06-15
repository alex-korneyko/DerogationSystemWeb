"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileApiService = /** @class */ (function () {
    function FileApiService(http, derogationApiService) {
        this.http = http;
        this.derogationApiService = derogationApiService;
        this.apiUrl = "/api/files";
    }
    FileApiService.prototype.deleteFile = function (fileId) {
        var _this = this;
        this.http.get(this.apiUrl + "/delete/" + fileId).subscribe(function (data) {
            _this.derogationApiService.currentDerogation = data;
        });
    };
    return FileApiService;
}());
exports.FileApiService = FileApiService;
//# sourceMappingURL=FileApiService.js.map