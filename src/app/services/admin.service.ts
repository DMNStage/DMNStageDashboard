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
        return this.http.get(this.authservice.host + '/users?type=admin');
    }

    getAdmin(id: number) {
        return this.http.get(this.authservice.host + '/users/' + id);
    }

    getAdminByUsername(username: string) {
        return this.http.get(this.authservice.host + '/usersbyusername/' + username);
    }

    saveAdmin(admin: Admin) {
        return this.http.post(this.authservice.host + '/users/admin', admin);
    }

    editAdmin(admin: Admin) {
        return this.http.put(this.authservice.host + '/users/admin/' + admin.id, admin);
    }

    deleteAdmin(id: number) {
        return this.http.delete(this.authservice.host + '/users/' + id);
    }
}
