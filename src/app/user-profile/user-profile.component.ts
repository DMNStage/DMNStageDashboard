import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../services/admin.service';
import {Admin} from '../model/admin.model';
import {AuthService} from '../services/auth.service';

declare var $: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

    AdminUsername: string;
    admin: Admin = new Admin();
    checked = 'true';

    constructor(public router: Router, public adminservice: AdminService, public authservice: AuthService) {

    }

    showNotification(from, align, color, message) {
        const type = ['danger', 'success'];
        const icon = ['error_outline', 'check'];

        $.notify(
            {
                message: message
            },
            {
                type: type[color], // {0}
                delay: 2000,
                placement: {
                    from: from,
                    align: align
                },
                template:
                    '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                    '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">' +
                    '<i class="material-icons">close</i>' +
                    '</button>' +
                    '<i class="material-icons" data-notify="icon">' + icon[color] + '</i> ' +
                    '<span data-notify="message">{2}</span>' +
                    '</div>'
            }
        );
    }

    ngOnInit() {
        this.AdminUsername = this.authservice.getTokenDataFromLocalStorage().username;
        console.log('ON INIT');
        console.log(this.AdminUsername);
        this.adminservice.getAdminByUsername(this.AdminUsername).subscribe(
            (data: Admin) => {
                this.admin = data;
                console.log(this.admin);
            },
            err => {
                this.showNotification('bottom', 'right', 0, 'erreur.');
            }
        )
    }

    onEditAdmin(dataForm) {
        (<HTMLInputElement> document.getElementById('submit')).disabled = true;
        this.adminservice.editAdmin(dataForm)
            .subscribe(
                data => {
                    this.showNotification('bottom', 'right', 1, 'Les données ont été modifié avec succès.');
                },
                err => {
                    (<HTMLInputElement> document.getElementById('submit')).disabled = false;
                    if (err.error.hasOwnProperty('result')) {
                        this.showNotification('bottom', 'right', 0, err.error.result);
                    } else {
                        console.log(err);
                        this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
                    }
                    // console.log(JSON.parse(err._body).message);
                }
            )
        ;
    }

}
