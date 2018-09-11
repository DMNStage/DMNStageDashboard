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
        return this.http.get(this.authservice.host + '/products?access_token=' + this.authservice.accessToken);
    }

    getSubProduct(id: number) {
        return this.http.get(this.authservice.host + '/products/' + id + '?access_token=' + this.authservice.accessToken);
    }

    saveSubProduct(subProduct: Subproduct) {
        return this.http.post(this.authservice.host + '/products?access_token=' + this.authservice.accessToken, subProduct);
    }

    editSubProduct(subProduct: Subproduct) {
        return this.http.put(this.authservice.host + '/products/' + subProduct.id + '?access_token=' + this.authservice.accessToken, subProduct);
    }

    deleteSubProduct(id: number) {
        return this.http.delete(this.authservice.host + '/subproducts/' + id + '?access_token=' + this.authservice.accessToken);
    }
}
