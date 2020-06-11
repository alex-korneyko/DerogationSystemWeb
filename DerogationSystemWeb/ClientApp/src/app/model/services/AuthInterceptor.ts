import { Injectable } from "@angular/core";
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from
    "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private tokenKey = "accessToken";

    constructor(private router: Router, private http: HttpClient) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${sessionStorage.getItem(this.tokenKey)}`)
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
                                    this.router.navigateByUrl("/static/accessDenied");
                                break;
                            default:
                            }
                        }
                    }
                )
            );
    }
}