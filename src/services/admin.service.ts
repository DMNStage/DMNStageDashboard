import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Admin} from '../model/admin.model';
import {AuthService} from './auth.service';

@Injectable()
export class AdminService {

    currentAdmin: any;

    constructor(public http: HttpClient, public authservice: AuthService) {
    }

    getAdmins() {
        return this.http.get('http://localhost:8088/users?type=admin&access_token=' + this.authservice.accessToken);
    }

    getAdmin(id: number) {
        return this.http.get('http://localhost:8088/users/' + id + '?access_token=' + this.authservice.accessToken);
    }

    saveAdmin(admin: Admin) {
        return this.http.post('http://localhost:8088/users/admin?access_token=' + this.authservice.accessToken, admin);
    }

    editAdmin(admin: Admin) {
        return this.http.put('http://localhost:8088/users/admin/' + admin.id + '?access_token=' + this.authservice.accessToken, admin);
    }

    deleteAdmin(id: number) {
        return this.http.delete('http://localhost:8088/users/' + id + '?access_token=' + this.authservice.accessToken);
    }
}
