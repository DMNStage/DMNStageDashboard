import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product.model';
import {AuthService} from './auth.service';

@Injectable()
export class ProductService {

    currentProduct: any;


    constructor(public http: HttpClient, public authservice: AuthService) {
    }

    getProducts() {
        return this.http.get(this.authservice.host + '/products?access_token=' + this.authservice.accessToken);
    }

    getProduct(id: number) {
        return this.http.get(this.authservice.host + '/products/' + id + '?access_token=' + this.authservice.accessToken);
    }

    saveProduct(product: Product) {
        return this.http.post(this.authservice.host + '/products?access_token=' + this.authservice.accessToken, product);
    }

    editProduct(product: Product) {
        return this.http.put(this.authservice.host + '/products/' + product.id + '?access_token=' + this.authservice.accessToken, product);
    }

    deleteProduct(id: number) {
        return this.http.delete(this.authservice.host + '/products/' + id + '?access_token=' + this.authservice.accessToken);
    }
}
