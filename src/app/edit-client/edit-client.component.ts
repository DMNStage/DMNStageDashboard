import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';

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
                },
                err => {
                    console.log(JSON.parse(err._body).message);
                }
            );
        this.router.navigate(['clients']);
    }

}
