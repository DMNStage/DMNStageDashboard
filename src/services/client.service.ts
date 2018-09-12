import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../model/client.model';
import {AuthService} from './auth.service';

@Injectable()
export class ClientService {

    currentClient: any;
    private readonly access_token = 'cfbb3994-a8a7-4ffb-bd53-98e7668035fc';

    constructor(public http: HttpClient, public authservice: AuthService) {
    }

    getProducts() {
        return this.http.get(this.authservice.host + '/products?access_token=' + this.authservice.accessToken);
    }

    getClients() {
        return this.http.get(this.authservice.host + '/users?type=client&access_token=' + this.authservice.accessToken);
    }

    getClient(id: number) {
        return this.http.get(this.authservice.host + '/users/' + id + '?access_token=' + this.authservice.accessToken);
    }

    getClientsBySubProduct(id: number) {
        return this.http.get<Array<string>>(this.authservice.host + '/clientsbysubproduct/' + id + '?access_token=' + this.authservice.accessToken);
    }

    saveClient(client: Client) {
        return this.http.post(this.authservice.host + '/users/client?access_token=' + this.authservice.accessToken, client);
    }

    editClient(client: Client) {
        return this.http.put(this.authservice.host + '/users/client/' + client.id + '?access_token=' + this.authservice.accessToken, client);
    }

    deleteClient(id: number) {
        return this.http.delete(this.authservice.host + '/users/' + id + '?access_token=' + this.authservice.accessToken);
    }
}
