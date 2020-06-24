import { Component } from "@angular/core";
import {MainStore} from "../../Store/MainStore";

@Component({
    templateUrl: "IndexPageComponent.html",
})
export class IndexPageComponent {
    
    constructor(public mainStore: MainStore) {
    }
}