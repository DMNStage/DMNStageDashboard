import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';

@Component({
    selector: 'app-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

    constructor(public router: Router, public adminservice: AdminService) {
    }

    ngOnInit() {
    }

    onSaveAdmin(dataForm) {
        this.adminservice.saveAdmin(dataForm)
            .subscribe(
                data => {
                },
                err => {
                    console.log(JSON.parse(err._body).message);
                }
            );
        // setTimeout(this.onSaveAdmin, 3000 );
        // apres avoir ajouté un admin, le admin ne s'affiche pas dans le component Admins
        // "'"router.navigate" s'execute avant de "adminservice.saveAdmin"
        this.router.navigate(['admins']);
    }
}
