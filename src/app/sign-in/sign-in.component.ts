import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Token} from '../model/token.model';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss', './sign-in.component.css']
})
export class SignInComponent implements OnInit {

    isLoginError = false;
    errorMessage = 'Erreur Inconnu';

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {

    }


    OnSubmit(username: string, password: string) {
        (<HTMLInputElement> document.getElementById('submit')).disabled = true;
        this.authService.authenticateUser(username, password).subscribe(
            (data: Token) => {
                this.authService.storeTokenData(data);
                this.router.navigate(['/dashboard']);
            },
            (err: HttpErrorResponse) => {
                (<HTMLInputElement> document.getElementById('submit')).disabled = false;
                console.log(err);
                if (err.status === 400) {
                    console.log(err.error.error_description);
                    if (err.error.error_description.toLowerCase().search('bad credentials') !== -1) {
                        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
                    } else if (err.error.error_description.toLowerCase().search('user is disabled') !== -1) {
                        this.errorMessage = 'Votre compte est désactivé';
                    }
                } else {
                    this.errorMessage = 'Erreur Système'
                }
                this.isLoginError = true;

            })
    };

}
