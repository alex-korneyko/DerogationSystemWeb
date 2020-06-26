import { Component } from "@angular/core";
import {MainStore} from "../../Store/MainStore";
import {VersionHistoryItem} from "../../model/domain/VersionHistoryItem";

@Component({
    templateUrl: "IndexPageComponent.html",
})
export class IndexPageComponent{
    
    constructor(public mainStore: MainStore) {
    }
    
}