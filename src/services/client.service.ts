import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../model/client.model';

@Injectable()
export class ClientService {

    currentClient: any;
    private readonly access_token = 'cfbb3994-a8a7-4ffb-bd53-98e7668035fc';

    constructor(public http: HttpClient) {
    }

    getProducts() {
        return this.http.get('http://localhost:8088/products?access_token=' + this.access_token);
    }

    getClients() {
        return this.http.get('http://localhost:8088/users?type=client&access_token=' + this.access_token);
    }

    getClient(id: number) {
        return this.http.get('http://localhost:8088/users/' + id + '?access_token=' + this.access_token);
    }

    saveClient(client: Client) {
        return this.http.post('http://localhost:8088/users/client?access_token=' + this.access_token, client);
    }

    editClient(client: Client) {
        return this.http.put('http://localhost:8088/users/client/' + client.id + '?access_token=' + this.access_token, client);
    }

    deleteClient(id: number) {
        return this.http.delete('http://localhost:8088/users/' + id + '?access_token=' + this.access_token);
    }
}
