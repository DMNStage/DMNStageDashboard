import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../model/client.model';
import {AuthService} from './auth.service';

@Injectable()
export class ClientService {

    currentClient: any;

    constructor(public http: HttpClient, public authservice: AuthService) {
    }

    getProducts() {
        return this.http.get(this.authservice.host + '/products');
    }

    getClients() {
        return this.http.get(this.authservice.host + '/users?type=client');
    }

    getClient(id: number) {
        return this.http.get(this.authservice.host + '/users/' + id);
    }

    getClientsBySubProduct(id: number) {
        return this.http.get<Array<string>>(this.authservice.host + '/clientsbysubproduct/' + id + '?access_token=' + this.authservice.accessToken);
    }

    saveClient(client: Client) {
        return this.http.post(this.authservice.host + '/users/client', client);
    }

    editClient(client: Client) {
        return this.http.put(this.authservice.host + '/users/client/' + client.id, client);
    }

    deleteClient(id: number) {
        return this.http.delete(this.authservice.host + '/users/' + id);
    }
}
