import {Component, OnInit} from '@angular/core';
import {Admin} from '../../model/admin.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
    selector: 'app-edit-admin',
    templateUrl: './edit-admin.component.html',
    styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {

    idAdmin: number;
    admin: Admin = new Admin();

    constructor(public router: Router, public activatedRoute: ActivatedRoute, public adminservice: AdminService) {
        this.idAdmin = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.admin = this.adminservice.currentAdmin;

        // this.adminservice.getAdmin(this.idAdmin)
        //   .subscribe(
        //     data => {this.admin = data;},
        //     err => {console.log(JSON.parse(err._body).message);}
        //   );
    }

    onEditAdmin(dataForm) {
        this.adminservice.editAdmin(dataForm)
            .subscribe(
                data => {
                },
                err => {
                    console.log(JSON.parse(err._body).message);
                }
            );
        this.router.navigate(['admins']);
    }

}
