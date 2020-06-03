import { Component, Input} from "@angular/core";

@Component({
    templateUrl: "PartNumberDashboardComponent.html",
    styleUrls: ["../../../../StyleSheet.css"],
    selector: "partnumber-dashboard"
})
export class PartNumberDashboardComponent {

    @Input() dashboardName = "AAA";
}