import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Admin} from '../model/admin.model';

@Injectable()
export class AdminService {

    currentAdmin: any;
    private readonly access_token = 'b2a1edd6-cbd9-4147-83df-0052e8be40c8';

    constructor(public http: HttpClient) {
    }

    getAdmins() {
        return this.http.get('http://localhost:8088/users?type=admin&access_token=' + this.access_token);
    }

    getAdmin(id: number) {
        return this.http.get('http://localhost:8088/users/' + id + '?access_token=' + this.access_token);
    }

    saveAdmin(admin: Admin) {
        return this.http.post('http://localhost:8088/users/admin?access_token=' + this.access_token, admin);
    }

    editAdmin(admin: Admin) {
        return this.http.put('http://localhost:8088/users/admin/' + admin.id + '?access_token=' + this.access_token, admin);
    }

    deleteAdmin(id: number) {
        return this.http.delete('http://localhost:8088/users/' + id + '?access_token=' + this.access_token);
    }
}
