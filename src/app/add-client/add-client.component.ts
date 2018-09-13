import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../services/client.service';
import {TreeviewConfig, TreeviewHelper, TreeviewItem} from 'ngx-treeview';
import {Subproduct} from '../model/subproduct.model';
import {FormBuilder} from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

    // container = document.querySelector('#form-group');
    // ps = new PerfectScrollbar('container');

    dataSource: any;
    items: TreeviewItem[];
    selectedItems: any[];
    selectedItemsList: string[] = [];
    // values: any[];

    config = TreeviewConfig.create({
        hasAllCheckBox: false,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 600
    });

    // Actif/Inactif radio
    checked = 'true';

    constructor(public router: Router, public clientservice: ClientService, private fb: FormBuilder) {
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
            });
    }

    ngOnInit() {
        this.clientservice.getProducts()
            .subscribe(
                data => {
                    this.dataSource = data;

                    this.dataSource.forEach(
                        function (product) {
                            // product.value =  product.id;
                            product.text = product.name;
                            product.children = product.subProducts;
                            delete product.pathName;
                            delete product.id;
                            delete product.name;
                            delete product.subProducts;
                            product.checked = false;
                            product.children.forEach(
                                function (subProduct) {
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
                                }
                            );
                        }
                    );
                    this.items = this.convertToTreeViewItem(this.dataSource);
                }
            )
        ;
    }

    onSelectedChange(selectedItems: any[]) {
        this.selectedItemsList = [];
        this.selectedItems = selectedItems;
        if (this.selectedItems.length !== 0) {
            this.selectedItems.forEach(item => {
                const foundItem = TreeviewHelper.findItemInList(this.items, item);
                this.selectedItemsList.push(foundItem.text);
            });
        }
    }

    convertToTreeViewItem(obj: any[]): any[] {
        const list = [];
        obj.forEach(elementObj => list.push(new TreeviewItem(elementObj)));
        return list;
    }

    onSaveClient(dataForm) {
        (<HTMLInputElement> document.getElementById('submit')).disabled = true;
        const subProduct: Subproduct[] = [];
        this.selectedItems.forEach(item => {
            subProduct.push(new Subproduct(item, 'test', 'test', '00:00', '00:00', 0, 'test'));
        });
        dataForm.subProducts = subProduct;
        this.clientservice.saveClient(dataForm)
            .subscribe(
                data => {
                    console.log(data);
                    this.showNotification('bottom', 'right', 1, 'L\'utilisateur a été ajouté avec succès.');
                    this.router.navigate(['clients']);
                },
                err => {
                    (<HTMLInputElement> document.getElementById('submit')).disabled = false;
                    if (err.error.hasOwnProperty('result')) {
                        this.showNotification('bottom', 'right', 0, err.error.result);
                    } else {
                        this.showNotification('bottom', 'right', 0, 'erreur inconnu.');
                    }
                    // console.log(JSON.parse(err._body).message);
                }
            )
        ;
    }
}
