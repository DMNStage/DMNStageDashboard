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
        return this.http.get(this.authservice.host + '/products');
    }

    getProduct(id: number) {
        return this.http.get(this.authservice.host + '/products/' + id);
    }

    saveProduct(product: Product) {
        return this.http.post(this.authservice.host + '/products', product);
    }

    editProduct(product: Product) {
        return this.http.put(this.authservice.host + '/products/' + product.id, product);
    }

    deleteProduct(id: number) {
        return this.http.delete(this.authservice.host + '/products/' + id);
    }
}
