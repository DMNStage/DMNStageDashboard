import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {Router} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import {Admin} from '../../model/admin.model';

@Component({
    selector: 'app-admins',
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

    displayedColumns = ['id', 'username', 'email', 'phone', 'firstName', 'lastName', 'active', 'action'];
    pageAdmins: any;
    dataSource = new MatTableDataSource(this.pageAdmins);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public http: HttpClient, public router: Router, public adminservice: AdminService, public authservice: AuthService) {

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngOnInit() {
        console.log('accesstoken:')
        console.log(this.authservice.accessToken);
        if (!this.authservice.accessToken) {
            console.log('Redirecting to /dashboard (no accesstoken)');
            this.router.navigate(['dashboard'])
        }

        this.dataSource.paginator = this.paginator;

        this.adminservice.getAdmins()
            .subscribe(
                data => {
                    this.pageAdmins = data;
                    this.dataSource.data = this.pageAdmins;
                }
            )
        ;
    }

    onEditAdmin(admin: Admin) {
        this.adminservice.currentAdmin = this.pageAdmins[this.pageAdmins.indexOf(admin)];
        this.router.navigate(['editadmin', admin.id])
    }

    onDeleteAdmin(admin: Admin) {
        this.adminservice.deleteAdmin(admin.id)
            .subscribe(
                data => {
                    this.pageAdmins.splice(this.pageAdmins.indexOf(admin), 1);
                    this.dataSource.data = this.pageAdmins;
                    setTimeout(() => {
                        this.dataSource.paginator = this.paginator;
                    });
                },
                err => {
                    console.log(JSON.parse(err._body).message);
                }
            )
        ;
    }
}
