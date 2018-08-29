import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Admin} from '../../model/admin.model';

@Component({
    selector: 'app-admins',
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

    public pageAdmins: any;

    constructor(public http: HttpClient, public router: Router, public adminservice: AdminService) {
    }

    ngOnInit() {
        this.adminservice.getAdmins()
            .subscribe(
                data => {
                    this.pageAdmins = data;
                },
                err => {
                    console.log(err);
                }
            )
        ;
    }

    onEditAdmin(admin: Admin) {
        // this.adminservice.currentAdmin = this.pageAdmins[this.pageAdmins.indexOf(admin)];
        // this.router.navigate(['edit-contact', admin.id])
    }

    onDeleteAdmin(admin: Admin) {
        // this.adminservice.deleteAdmin(admin.id)
        //     .subscribe(
        //         data => {
        //             this.pageAdmins.splice(this.pageAdmins.indexOf(admin));
        //         },
        //         err => {
        //             console.log(JSON.parse(err._body).message);
        //         }
        //     )
        // ;
    }

}
