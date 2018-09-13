import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product.model';
import {ProductService} from '../services/product.service';
import {Router} from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

    product: Product = new Product();

    constructor(public router: Router, public productservice: ProductService) {

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
        this.product = this.productservice.currentProduct;
    }

    onEditProduct(dataForm) {
        // console.log(dataForm);
        // console.log(this.selectedItem);
        this.productservice.saveProduct(dataForm)
            .subscribe(
                data => {
                    this.showNotification('bottom', 'right', 1, 'Le produit a été modifié avec succès.');
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
