import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../auth.service';
import {Token} from '../../model/token.model';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> /*| Promise<boolean> | boolean*/ {

        const currentTokenData: Token = this.authService.getTokenDataFromLocalStorage();
        if (currentTokenData != null) {
            return this.authService.checkTokenData(currentTokenData)
                .pipe(mergeMap(
                    result => {
                        if (result) {
                            console.log('guard said YES');
                            return of(true);
                        } else {
                            return this.authService.getNewTokenDataFromRefreshToken(currentTokenData.refresh_token).pipe(map(
                                (newTokenData: Token) => {
                                    console.log('got a new token');
                                    this.authService.storeTokenData(newTokenData);
                                    console.log('guard said YES');
                                    return true;
                                }), catchError(err => {
                                    console.log('can\'t get a new access token from refresh token');
                                    console.log('guard said NO');
                                    this.router.navigate(['/login']);
                                    this.authService.clearTokenData();
                                    return of(false);
                                })
                            );
                        }
                    }), catchError((err) => {
                        console.log('guard said NO');
                        this.router.navigate(['/login']);
                        this.authService.clearTokenData();
                        return of(false);
                    })
                )

        } else {
            console.log('guard said NO');
            this.router.navigate(['/login']);
            this.authService.clearTokenData();
            return of(false);
        }
    }
}

