import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Token} from '../model/token.model';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    isLoginError = false;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {

    }


    OnSubmit(username: string, password: string) {
        this.authService.authenticateUser(username, password).subscribe(
            (data: Token) => {
                this.authService.storeTokenData(data);
                this.router.navigate(['/dashboard']);
            },
            (err: HttpErrorResponse) => {
                this.isLoginError = true;
            })
    }
}
