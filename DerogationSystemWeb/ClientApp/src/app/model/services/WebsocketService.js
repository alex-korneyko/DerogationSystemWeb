"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebsocketService = /** @class */ (function () {
    function WebsocketService(connectionBuilder) {
        this.connectionBuilder = connectionBuilder;
        this.hubConnection = this.connectionBuilder.withUrl("/interactive").build();
    }
    //private const hubConnection = new signalR.HubConnectionBuilder()
    //    .withUrl("/chat")
    //    .build();
    WebsocketService.prototype.connect = function () {
        var _this = this;
        console.log("Connecting to the server");
        this.hubConnection.start().then(function () {
            console.log(_this.hubConnection);
        });
        this.isConnected = true;
    };
    WebsocketService.prototype.disconnect = function () {
        var _this = this;
        console.log("Disconnecting from the server");
        this.hubConnection.stop().then(function () {
            console.log(_this.hubConnection);
        });
        this.isConnected = false;
    };
    return WebsocketService;
}());
exports.WebsocketService = WebsocketService;
//# sourceMappingURL=WebsocketService.js.map