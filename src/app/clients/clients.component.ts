import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '../../../node_modules/@angular/common/http';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {Client} from '../../model/client.model';

// export interface PeriodicElement {
//     id: number;
//     name: string;
//     weight: number;
//     symbol: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//     {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//     {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//     {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//     {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//     {id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//     {id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//     {id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//     {id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//     {id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//     {id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
    // displayedColumns = ['id', 'name', 'weight', 'symbol', 'action'];
    displayedColumns = ['id', 'username', 'email', 'phone', 'organizationName', 'active', 'role', 'action'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    pageClients: any;
    dataSource = new MatTableDataSource(this.pageClients);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public http: HttpClient, public router: Router, public clientservice: ClientService) {
        // this.clientservice.getClients()
        //     .subscribe(
        //         data => {
        //             this.pageClients = data;
        //             this.dataSource.data = this.pageClients;
        //         }
        //     )
        // ;
    }

    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
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
                    this.pageClients.splice(this.pageClients.indexOf(client));
                    this.dataSource.data = this.pageClients;
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
