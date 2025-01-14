import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Product} from '../interfaces/product.interface';
import {catchError, tap, throwError} from 'rxjs';
import {ServerResponse} from '../interfaces/response.interface';

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
  getProductByName(name: string) {
    return this.http.get<Product[]>(`${this.baseApiUrl}api/Product/search/${name}`)
  }
  addProduct(payload: {
    name: string,
    manufacturerId: number,
    categoryId: number,
    cost: number,
    count: number,
    description: string,
    imagePath: string | null
  }) {
    return this.http.post<HttpResponse<ServerResponse>>(`${this.baseApiUrl}api/Product`, payload).pipe(
      catchError(this.handleError))
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseApiUrl}api/Product/${id}`)
  }

  updateProduct(id: number, payload: {
    name: string,
    manufacturerId: number,
    categoryId: number,
    cost: number,
    count: number,
    description: string,
    imagePath: string | null
  }) {
    return this.http.patch(`${this.baseApiUrl}api/Product/${id}`, payload).pipe(
      catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
