import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';

declare var $: any;

@Component({
    selector: 'app-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

    constructor(public router: Router, public adminservice: AdminService) {
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
    }

    onSaveAdmin(dataForm) {
        this.adminservice.saveAdmin(dataForm)
            .subscribe(
                data => {
                    this.showNotification('bottom', 'right', 1, 'L\'utilisateur a été ajouté avec succès.');
                    this.router.navigate(['admins']);
                },
                err => {
                    if (err.error.hasOwnProperty('result')) {
                        this.showNotification('bottom', 'right', 0, err.error.result);
                    } else {
                        console.log(err);
                        this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
                    }
                    // console.log(JSON.parse(err._body).message);
                }
            );
        // setTimeout(this.onSaveAdmin, 3000 );
        // apres avoir ajouté un admin, le admin ne s'affiche pas dans le component Admins
        // "'"router.navigate" s'execute avant de "adminservice.saveAdmin"

    }
}
