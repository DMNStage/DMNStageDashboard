import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

    constructor(public router: Router, public clientservice: ClientService) {
    }

    ngOnInit() {
    }

    onSaveClient(dataForm) {
        this.clientservice.saveClient(dataForm)
            .subscribe(
                data => {
                },
                err => {
                    console.log(JSON.parse(err._body).message);
                }
            );
        // setTimeout(this.onSaveClient, 3000 );
        // apres avoir ajouté un client, le client ne s'affiche pas dans le component Clients
        // "'"router.navigate" s'execute avant de "clientservice.saveClient"
        this.router.navigate(['clients']);
    }
}
