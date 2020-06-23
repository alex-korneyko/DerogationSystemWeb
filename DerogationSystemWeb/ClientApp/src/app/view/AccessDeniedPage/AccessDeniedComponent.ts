import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {LoginApiService} from "../../controllers/LoginApiService";

@Component({
    templateUrl: "AccessDeniedComponent.html",
    styleUrls: ["../../StyleSheet.css"]
})
export class AccessDeniedComponent implements OnInit{

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private loginApiService: LoginApiService) {
        
    }

    ngOnInit(): void {
        console.log("Redirect route -> ", this.activatedRoute.snapshot.queryParams["redirectUrl"]);
        
        this.loginApiService.loginRedirectUrl = this.activatedRoute.snapshot.queryParams["redirectUrl"];
    }
}