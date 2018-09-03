import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';

declare var $: any;

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

    constructor(public router: Router, public clientservice: ClientService) {
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
            });
    }

    ngOnInit() {
    }

    onSaveClient(dataForm) {
        this.clientservice.saveClient(dataForm)
            .subscribe(
                data => {
                    this.showNotification('bottom', 'right', 1, 'L\'utilisateur a été ajouté avec succès.');
                    this.router.navigate(['clients']);
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
        // setTimeout(this.onSaveClient, 3000 );
        // apres avoir ajouté un client, le client ne s'affiche pas dans le component Clients
        // "'"router.navigate" s'execute avant de "clientservice.saveClient"
        // this.router.navigate(['clients']);
    }
}
