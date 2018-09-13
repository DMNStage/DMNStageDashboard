import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SubproductService} from '../services/subproduct.service';
import {ProductService} from '../services/product.service';
import {Subproduct} from '../model/subproduct.model';

declare var $: any;

@Component({
    selector: 'app-edit-subproduct',
    templateUrl: './edit-subproduct.component.html',
    styleUrls: ['./edit-subproduct.component.scss']
})
export class EditSubproductComponent implements OnInit {

    productList: any;
    selectedItem: number;
    subProduct: Subproduct = new Subproduct(null, 'test', 'test', '00:00', '00:00', 0, 'test');

    constructor(public router: Router, public subproductservice: SubproductService, public productservice: ProductService) {
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

    ngOnInit() {
        this.subProduct = this.subproductservice.currentSubProduct;
        this.selectedItem = this.subproductservice.currentProduct;
        this.productservice.getProducts()
            .subscribe(
                data => {
                    this.productList = data;
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 500) {
                        this.showNotification('bottom', 'right', 0, 'Erreur system.');
                    } else {
                        this.showNotification('bottom', 'right', 0, 'Erreur inconnu.');
                    }
                }
            )
    }

    onEditSubProduct(dataForm) {
        // console.log(dataForm);
        // console.log(this.selectedItem);
        this.subproductservice.saveSubProduct(dataForm, this.selectedItem)
            .subscribe(
                data => {
                    this.showNotification('bottom', 'right', 1, 'Le sous-produit a été modifié avec succès.');
                    this.router.navigate(['products']);
                },
                err => {
                    if (err.error.hasOwnProperty('result')) {
                        this.showNotification('bottom', 'right', 0, err.error.result);
                    } else {
                        console.log(err);
                        this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
                    }
                }
            )
        ;
    }
}

@Pipe({
    name: 'LockFilter'
})

export class SearchPipe implements PipeTransform {
    transform(value: any, args?: any): any {

        if (!value) {
            return null;
        }
        if (!args) {
            return value;
        }

        args = args.toLowerCase();

        return value.filter(function (item) {
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    }
}
