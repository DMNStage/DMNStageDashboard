import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Token} from '../model/token.model';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import * as SecureLS from 'secure-ls';

@Injectable()
export class AuthService {

    readonly host = 'https://api.dmnstage.com';
    // readonly host = 'http://localhost:8088';

    private readonly tokenLocalStorageDataKey = 'TokenData';
    private readonly clientId = 'QWRtaW5BcHA=';
    private readonly secret = 'c2VjcmV0';

    private ls = new SecureLS({encodingType: 'aes'});

    constructor(public http: HttpClient, private router: Router) {
    }

    authenticateUser(username, password) {
        let data = new HttpParams();
        data = data.set('username', username);
        data = data.set('password', password);
        data = data.set('grant_type', 'password');

        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(atob(this.clientId) + ':' + atob(this.secret)),
            'No-Auth': 'true'
        });
        return this.http.post<Token>(this.host + '/oauth/token', data, {headers: reqHeader})
    }

    checkTokenData(data: Token) {
        console.log('Checking Token ...');
        const expirationDate = new Date(data.expiration);
        const now = new Date();
        now.setMinutes(now.getMinutes() + 0); // now + 2 minutes

        if (expirationDate > now) {
            console.log('Token not expired');
            console.log('Checking token server side ...');

            const reqHeader = new HttpHeaders({
                'Authorization': 'Bearer ' + data.access_token,
                'No-Auth': 'true'
            });
            return this.http.head(this.host + '/checktoken', {headers: reqHeader})
                .pipe(map(
                    (result) => {
                        // Server send empty response with 200 http status so the token is valid
                        console.log('Server side said token valid');
                        return true;
                    }), catchError((err: HttpErrorResponse) => {
                        console.log('Server side said token invalid');
                        return of(false);
                    })
                );
        } else {
            console.log('Token expired');
            return of(false);
        }
    }

    getNewTokenDataFromRefreshToken(refreshtoken: string) {

        console.log('getting new access token from refresh token');
        let data = new HttpParams();
        data = data.set('refresh_token', refreshtoken);
        data = data.set('grant_type', 'refresh_token');

        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(atob(this.clientId) + ':' + atob(this.secret)),
            'No-Auth': 'true'
        });
        return this.http.post<Token>(this.host + '/oauth/token', data, {headers: reqHeader})

    }

    storeTokenData(data: Token) {
        console.log('Storing token to local storage');
        this.ls.set(this.tokenLocalStorageDataKey, JSON.stringify(data));
        localStorage.setItem('debug_' + this.tokenLocalStorageDataKey, JSON.stringify(data));
    }

    getTokenDataFromLocalStorage(): Token {
        try {
            return JSON.parse(this.ls.get(this.tokenLocalStorageDataKey));
            // return JSON.parse(localStorage.getItem(this.tokenLocalStorageDataKey));
        } catch (e) {
            console.log('Can\t get tokenData from localStorage');
            return null;
        }
    }

    clearTokenData() {
        console.log('Removing old Token Data from local storage');
        localStorage.removeItem(this.tokenLocalStorageDataKey);
    }

    revokeToken(tokenData: Token) {

        let body = new HttpParams();
        body = body.set('clientid', this.clientId);
        body = body.set('username', tokenData.username);
        body = body.set('access_token', tokenData.access_token);
        return this.http.post(this.host + '/revoke_token', body);
    }

    logout() {
        const tokenData = this.getTokenDataFromLocalStorage();
        if (tokenData != null) {
            this.revokeToken(tokenData).subscribe(response => {
                    localStorage.removeItem(this.tokenLocalStorageDataKey);
                    this.router.navigate(['/login']);
                },
                err => {
                    console.log('Can\'t revoke token server side');
                    localStorage.removeItem(this.tokenLocalStorageDataKey);
                    this.router.navigate(['/login']);
                })
        }
    }
}
