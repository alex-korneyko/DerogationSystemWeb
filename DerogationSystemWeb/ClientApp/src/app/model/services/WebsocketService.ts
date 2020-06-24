import * as signalR from "@microsoft/signalr";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class WebsocketService {

    private hubConnection : signalR.HubConnection;

    get isConnected(): boolean {
        return this.hubConnection.state === signalR.HubConnectionState.Connected;
    }
    
    constructor(private http: HttpClient) {
        http.get("/api/IsDevelopment").subscribe((isDev: boolean) => {
            if (isDev) {
                this.hubConnection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/interactive").build();
            } else {
                this.hubConnection = new signalR.HubConnectionBuilder().withUrl("/interactive").build();
            }
        });
    }

    public connect() {
        if (this.hubConnection !== undefined) {
            this.hubConnection.start();
        }
    }

    public disconnect() {
        this.hubConnection.stop().then(() => {
            console.log(this.hubConnection);
        });
    }

    public addHandler<T>(methodName: string, handler: (payload: T, actionType: string) => void) {
        if (this.hubConnection !== undefined) {
            this.hubConnection.off(methodName);
            this.hubConnection.on(methodName, handler);
        }
    }
}