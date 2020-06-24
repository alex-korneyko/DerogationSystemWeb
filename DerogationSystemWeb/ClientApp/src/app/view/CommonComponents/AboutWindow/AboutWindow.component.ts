import { Component } from "@angular/core";
import {MainStore} from "../../../Store/MainStore";

@Component({
    selector: "about-window",
    templateUrl: "AboutWindow.component.html",
    styleUrls: ["../../../StyleSheet.css"]
})
export class AboutWindowComponent {
    
    id = "aboutWindow"
    
    constructor(public mainStore: MainStore) {
    }
}