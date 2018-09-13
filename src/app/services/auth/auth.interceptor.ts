import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Token} from '../../model/token.model';
import {AuthService} from '../auth.service';
import {catchError, mergeMap, tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'true') {
            return next.handle(req.clone());
        }


        const data: Token = this.authService.getTokenDataFromLocalStorage();
        if (data != null) {
            const expirationDate = new Date(data.expiration);
            const now = new Date();
            now.setMinutes(now.getMinutes() + 0); // now + 2 minutes

            if (expirationDate > now) {
                const clonedreq = req.clone({
                    headers: req.headers.set('Authorization', 'Bearer ' + data.access_token)
                });
                return next.handle(clonedreq)
                    .pipe(tap(
                        succ => {
                        },
                        err => {
                            if (err.status === 401) {
                                console.log('interceptor said NO');
                                console.log('got 401 from server');
                                this.router.navigate(['/login']);
                                this.authService.clearTokenData();
                            }
                        }
                    ));
            } else {
                let isNot401 = false;
                return this.authService.getNewTokenDataFromRefreshToken(data.refresh_token).pipe(mergeMap(
                    (newToken: Token) => {
                        console.log('got a new token');
                        this.authService.storeTokenData(newToken);
                        console.log('guard said YES');
                        const clonedreq = req.clone({
                            headers: req.headers.set('Authorization', 'Bearer ' + newToken.access_token)
                        });
                        return next.handle(clonedreq)
                            .pipe(tap(
                                succ => {
                                },
                                err => {
                                    if (err.status === 401) {
                                        console.log('interceptor said NO----');
                                        console.log('got 401 from server---');
                                        this.router.navigate(['/login']);
                                        this.authService.clearTokenData();
                                    } else {
                                        isNot401 = true;
                                    }
                                }
                            ));
                    }), catchError(err => {
                    if (!isNot401) {
                        console.log('can\'t get a new access token from refresh token');
                        console.log('interceptor said NO');
                        this.router.navigate(['/login']);
                        this.authService.clearTokenData();
                    }
                        return of<HttpEvent<any>>();
                    })
                );
                /*console.log('interceptor said NO');
                this.router.navigate(['/login']);
                this.authService.clearTokenData();*/
            }
        } else {
            console.log('interceptor said NO');
            this.router.navigate(['/login']);
            this.authService.clearTokenData();

        }


    }
}
