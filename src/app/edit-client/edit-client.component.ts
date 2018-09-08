import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {TreeviewConfig, TreeviewHelper, TreeviewItem} from 'ngx-treeview';
import {Subproduct} from '../../model/subproduct.model';

declare var $: any;

@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

    idClient: number;
    client: Client = new Client();
    // client: Client;

    productsList: any;
    treeViewItem: TreeviewItem[];

    selectedItemsValue: number[] = [];
    selectedItemsText: string[] = [];

    config = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 600
    });

    constructor(public router: Router, public activatedRoute: ActivatedRoute, public clientservice: ClientService) {
        this.idClient = activatedRoute.snapshot.params['id'];
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
        this.client = this.clientservice.currentClient;

        this.client.subProducts.forEach(subProduct => {
            this.selectedItemsValue.push(subProduct.id);
        });

        // this.clientservice.getClient(this.idClient)
        //     .subscribe(
        //         data => {
        //
        //             // this.client = data;
        //             console.log(data);
        //         },
        //         err => {
        //             console.log(JSON.parse(err._body).message);
        //         }
        //     )
        // ;

        this.clientservice.getProducts()
            .subscribe(
                data => {
                    this.productsList = data;

                    this.productsList.forEach(product => {
                        // product.value =  product.id;
                        product.text = product.name;
                        product.children = product.subProducts;
                        delete product.id;
                        delete product.pathName;
                        delete product.name;
                        delete product.subProducts;
                        product.checked = false;
                        product.children.forEach(subProduct => {
                            subProduct.value = subProduct.id;
                            subProduct.text = subProduct.name;
                            delete subProduct.step;
                            delete subProduct.startTime;
                            delete subProduct.endTime;
                            delete subProduct.pathName;
                            delete subProduct.ext;
                            delete subProduct.id;
                            delete subProduct.name;
                            subProduct.checked = false;
                            if (this.selectedItemsValue.length !== 0) {
                                this.selectedItemsValue.forEach(item => {
                                    if (item === subProduct.value) {
                                        subProduct.checked = true;
                                    }
                                });
                            }
                        });
                    });
                    this.treeViewItem = this.convertToTreeViewItem(this.productsList);
                    this.onSelectedChange(this.selectedItemsValue);
                }
            )
        ;
    }

    convertToTreeViewItem(obj: any[]): any[] {
        const list = [];
        obj.forEach(elementObj => list.push(new TreeviewItem(elementObj)));
        return list;
    }

    onSelectedChange(selectedItemsValue: number[]) {
        this.selectedItemsText = [];
        this.selectedItemsValue = selectedItemsValue;
        if (this.selectedItemsValue.length !== 0) {
            this.selectedItemsValue.forEach(item => {
                const foundItem = TreeviewHelper.findItemInList(this.treeViewItem, item);
                this.selectedItemsText.push(foundItem.text);
            });
        }
    }

    onEditClient(dataForm) {
        const subProduct: Subproduct[] = [];
        this.selectedItemsValue.forEach(item => {
            subProduct.push(new Subproduct(item));
        });
        dataForm.subProducts = subProduct;
        this.clientservice.editClient(dataForm)
            .subscribe(
                data => {
                    this.showNotification('bottom', 'right', 1, 'L\'utilisateur a été modifié avec succès.');
                    this.router.navigate(['clients']);
                },
                err => {
                    if (err.error.hasOwnProperty('result')) {
                        this.showNotification('bottom', 'right', 0, err.error.result);
                    } else {
                        console.log(err);
                        this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
                    }
                    // console.log(JSON.parse(err._body).message);
                }
            )
        ;
    }

}
