import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product.model';
import {Subproduct} from '../model/subproduct.model';
import {SubproductService} from '../services/subproduct.service';
import {ClientService} from '../services/client.service';

declare var $: any;

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    productDisplayedColumns = ['id', 'name', 'pathName', 'action'];
    productsPage: any;
    productDataSource = new MatTableDataSource(this.productsPage);

    subProductDisplayedColumns = ['id', 'name', 'pathName', 'startTime', 'endTime', 'step', 'ext', 'action'];
    subProductsPage: any;
    subProductDataSource = new MatTableDataSource(this.subProductsPage);

    @ViewChild(MatPaginator) productPaginator: MatPaginator;
    @ViewChild('productSort') productSort: MatSort;

    @ViewChild(MatPaginator) subProductPaginator: MatPaginator;
    @ViewChild('subProductSort') subProductSort: MatSort;

    constructor(public http: HttpClient, public router: Router, public productservice: ProductService, public subproductservice: SubproductService, public clientservice: ClientService) {

    }

    showNotification(from, align, color, message) {
        const type = ['danger', 'success'];
        const icon = ['error_outline', 'check'];

        $.notify(
            {
                message: message
            },
            {
                type: type[color], // {0}
                delay: 2000,
                placement: {
                    from: from,
                    align: align
                },
                template:
                    '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                    '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">' +
                    '<i class="material-icons">close</i>' +
                    '</button>' +
                    '<i class="material-icons" data-notify="icon">' + icon[color] + '</i> ' +
                    '<span data-notify="message">{2}</span>' +
                    '</div>'
            }
        );
    }

    ngAfterViewInit() {
        this.productDataSource.paginator = this.productPaginator;
        this.productDataSource.sort = this.productSort;

        this.subProductDataSource.paginator = this.subProductPaginator;
        this.subProductDataSource.sort = this.subProductSort;
    }

    productApplyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.productDataSource.filter = filterValue;
    }

    subProductApplyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.subProductDataSource.filter = filterValue;
    }

    ngOnInit() {
        this.productDataSource.paginator = this.productPaginator;
        this.subProductDataSource.paginator = this.subProductPaginator;

        this.productservice.getProducts()
            .subscribe(
                data => {
                    this.productsPage = data;
                    this.productDataSource.data = this.productsPage;
                }
            )
        ;
    }

    onCheckProduct(product: Product) {
        this.subProductsPage = product.subProducts;
        this.subProductDataSource.data = this.subProductsPage;
    }

    onEditProduct(product: Product) {
        this.productservice.currentProduct = this.productsPage[this.productsPage.indexOf(product)];
        this.router.navigate(['editproduct'])
    }

    onEditSubProduct(subProduct: Subproduct) {
        this.subproductservice.currentSubProduct = this.subProductsPage[this.subProductsPage.indexOf(subProduct)];
        this.router.navigate(['editsubproduct']);
    }

    onDeleteProduct(product: Product) {
        if (product.subProducts.length > 0) {
            this.showNotification('bottom', 'right', 0, 'Vous ne pouvais pas supprimé un produit non vide.');
        } else {
            this.productservice.deleteProduct(product.id)
                .subscribe(
                    data => {
                        this.productsPage.splice(this.productsPage.indexOf(product), 1);
                        this.productDataSource.data = this.productsPage;
                        setTimeout(() => {
                            this.productDataSource.paginator = this.productPaginator;
                        });
                        this.showNotification('bottom', 'right', 1, 'Le produit a été supprimé avec succès.');
                    },
                    err => {
                        this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
                    }
                )
            ;
            // console.log(client);
        }

    }

    onDeleteSubProduct(subProduct: Subproduct) {
        this.clientservice.getClientsBySubProduct(subProduct.id)
            .subscribe(
                clientList => {

                    const clients: Array<string> = clientList;
                    if (clients.length > 0) {

                        let message = 'Le sous-produit que vous voullez suppimé a des client qui y ont accés. [ ';
                        clients.forEach(client => {
                            message = message.concat(client + ', ');
                        });
                        message = message.slice(0, -2);
                        message = message.concat(' ]');

                        this.showNotification('bottom', 'right', 0, message);
                    } else {
                        this.subproductservice.deleteSubProduct(subProduct.id)
                            .subscribe(
                                data => {
                                    this.subProductsPage.splice(this.subProductsPage.indexOf(subProduct), 1);
                                    this.subProductDataSource.data = this.subProductsPage;
                                    setTimeout(() => {
                                        this.subProductDataSource.paginator = this.subProductPaginator;
                                    });
                                    this.showNotification('bottom', 'right', 1, 'Le sous-produit a été supprimé avec succès.');
                                },
                                err => {
                                    this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
                                }
                            )
                        ;
                    }
                },
                err => {
                    this.showNotification('bottom', 'right', 0, err.error);
                }
            )
        ;
    }
}
