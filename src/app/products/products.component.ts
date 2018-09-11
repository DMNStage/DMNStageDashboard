import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product.model';
import {Subproduct} from '../../model/subproduct.model';
import {SubproductService} from '../../services/subproduct.service';

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

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public http: HttpClient, public router: Router, public productservice: ProductService, public subproductservice: SubproductService) {

    }

    ngAfterViewInit() {
        this.productDataSource.paginator = this.paginator;
        this.productDataSource.sort = this.sort;

        // this.productsPage.paginator = this.paginator;
        // this.productsPage.productSort = this.productSort;
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
        this.productDataSource.paginator = this.paginator;
        // this.productsPage.paginator = this.paginator;

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
        this.router.navigate(['editproduct', product.id])
    }

    onEditSubProduct(subProduct: Subproduct) {
        this.subproductservice.currentSubProduct = this.subProductsPage[this.subProductsPage.indexOf(subProduct)];
        this.router.navigate(['editsubproduct', subProduct.id])
    }

    onDeleteProduct(product: Product) {
        this.productservice.deleteProduct(product.id)
            .subscribe(
                data => {
                    this.productsPage.splice(this.productsPage.indexOf(product), 1);
                    this.productDataSource.data = this.productsPage;
                    setTimeout(() => {
                        this.productDataSource.paginator = this.paginator;
                    });
                },
                err => {
                    console.log(JSON.parse(err._body).message);
                }
            )
        ;
        // console.log(client);
    }

    onDeleteSubProduct(subProduct: Subproduct) {
        this.subproductservice.deleteSubProduct(subProduct.id)
            .subscribe(
                data => {
                    this.subProductsPage.splice(this.subProductsPage.indexOf(subProduct), 1);
                    this.subProductDataSource.data = this.subProductsPage;
                    setTimeout(() => {
                        this.subProductDataSource.paginator = this.paginator;
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
