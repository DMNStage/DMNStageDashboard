import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';

declare var $: any;

@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

    idClient: number;
    client: Client = new Client();

    constructor(public router: Router, public activatedRoute: ActivatedRoute, public clientservice: ClientService) {
        this.idClient = activatedRoute.snapshot.params['id'];
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
        this.client = this.clientservice.currentClient;

        // this.clientservice.getClient(this.idClient)
        //   .subscribe(
        //     data => {this.client = data;},
        //     err => {console.log(JSON.parse(err._body).message);}
        //   );
    }

    onEditClient(dataForm) {
        this.clientservice.editClient(dataForm)
            .subscribe(
                data => {
                    this.showNotification('bottom', 'right', 1, 'L\'utilisateur a été modifié avec succès.');
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
            )
        ;
    }

}
