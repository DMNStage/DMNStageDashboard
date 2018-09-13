import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Subproduct} from '../model/subproduct.model';

@Injectable()
export class SubproductService {

    currentSubProduct: any;

    constructor(public http: HttpClient, public authservice: AuthService) {
    }

    getSubProducts() {
        return this.http.get(this.authservice.host + '/subproducts');
    }

    getSubProduct(id: number) {
        return this.http.get(this.authservice.host + '/subproducts/' + id);
    }

    saveSubProduct(subProduct: Subproduct, productId: number) {
        return this.http.post(this.authservice.host + '/subproducts?selectedproduct=' + productId, subProduct);
    }

    editSubProduct(subProduct: Subproduct, productId: number) {
        return this.http.put(this.authservice.host + '/subproducts/' + subProduct.id + '?selectedproduct=' + productId, subProduct);
    }

    deleteSubProduct(id: number) {
        return this.http.delete(this.authservice.host + '/subproducts/' + id);
    }
}
