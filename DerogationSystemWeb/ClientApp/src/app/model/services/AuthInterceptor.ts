import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from
    "@angular/common/http";
import {Router} from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private tokenKey = "accessToken";

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${localStorage.getItem(this.tokenKey)}`)
        });

        return next.handle(authReq)
            .pipe(
                tap(
                    event => {
                        if (event instanceof HttpResponse) {

                        }
                    },
                    err => {
                        if (err instanceof HttpErrorResponse) {
                            switch (err.status) {
                                case 400:
                                    console.log("Error 400");
                                break;
                                case 401:
                                    console.log("Error 401");

                                    if (this.router.url.substring(8, 20) !== "accessDenied") {
                                        this.router.navigateByUrl(`/static/accessDenied?redirectUrl=${this.router.url}`);
                                    }
                                    
                                break;
                            default:
                            }
                        }
                    }
                )
            );
    }
}