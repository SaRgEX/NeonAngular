import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/'

  constructor() { }

  getProducts() {
    return this.http.get<Product[]>(`${this.baseApiUrl}api/Product`)
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.baseApiUrl}api/Product/${id}`)
  }
}
