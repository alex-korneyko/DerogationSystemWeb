import * as signalR from "@microsoft/signalr";
import { Injectable } from "@angular/core";

@Injectable()
export class WebsocketService {

    private hubConnection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/interactive").build();

    get isConnected(): boolean {
        return this.hubConnection.state === signalR.HubConnectionState.Connected;
    }

    public connect() {
        console.log("Connecting to the server");
        this.hubConnection.start();
    }

    public disconnect() {
        console.log("Disconnecting from the server");
        this.hubConnection.stop().then(() => {
            console.log(this.hubConnection);
        });
    }

    public addHandler<T>(methodName: string, handler: (payload: T, actionType: string) => void) {
        console.log("Add handler: " + methodName);
        this.hubConnection.off(methodName);
        this.hubConnection.on(methodName, handler);
    }
}