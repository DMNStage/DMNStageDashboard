import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Token} from '../model/token.model';

@Injectable()
export class AuthService {

    host = 'https://api.dmnstage.com';

    accessToken: string;
    constructor(public http: HttpClient) {
    }
    sendRequest() {
        console.log('calling it');
        const username = 'ClientId';
        const password = 'secret';

        const tokenHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        });

        let body = new HttpParams();
        body = body.set('username', 'kumohira');
        body = body.set('password', '654321');
        body = body.set('grant_type', 'password');
        return this.http.post<Token>(this.host + '/oauth/token', body, {headers: tokenHeaders});
    }

    getAccessToken() {
        return this.sendRequest()
            .subscribe(
                data => {
                    console.log(data.refresh_token);
                    this.accessToken = data.access_token;
                },
                err => {
                    console.log(JSON.parse(err._body).message);
                }
            );
    }
}
