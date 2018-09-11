import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {Client} from '../../model/client.model';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    displayedColumns = ['id', 'username', 'email', 'phone', 'organizationName', 'active', 'action'];
    pageClients: any;
    dataSource = new MatTableDataSource(this.pageClients);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public http: HttpClient, public router: Router, public clientservice: ClientService) {

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // this.pageClients.paginator = this.paginator;
        // this.pageClients.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        // this.pageClients.filter = filterValue;
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        // this.pageClients.paginator = this.paginator;

        this.clientservice.getClients()
            .subscribe(
                data => {
                    this.pageClients = data;
                    this.dataSource.data = this.pageClients;
                }
            )
        ;
    }

    onEditClient(client: Client) {
        this.clientservice.currentClient = this.pageClients[this.pageClients.indexOf(client)];
        this.router.navigate(['editclient', client.id])
    }

    onDeleteClient(client: Client) {
        this.clientservice.deleteClient(client.id)
            .subscribe(
                data => {
                    this.pageClients.splice(this.pageClients.indexOf(client), 1);
                    this.dataSource.data = this.pageClients;
                    setTimeout(() => {
                        this.dataSource.paginator = this.paginator;
                    });
                },
                err => {
                    console.log(JSON.parse(err._body).message);
                }
            )
        ;
        // console.log(client);
    }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
