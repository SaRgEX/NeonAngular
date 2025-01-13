import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Cart} from '../interfaces/cart.interface';
import {catchError, tap, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/';
  constructor() { }

  getCart(id: number) {
    return this.http.get<Cart>(`${this.baseApiUrl}api/Profile/cart/${id}`)
  }

  getTotalPrice(id: number) {
    return this.http.get<number>(`${this.baseApiUrl}cart/totalPrice/${id}`)
  }

  getPurchases(id: number) {
    return this.http.get<Cart>(`${this.baseApiUrl}api/Cart/${id}`)
  }

  changeCountProduct(id: number, payload: {productId: number, count: number}) {
    return this.http.patch(`${this.baseApiUrl}api/Profile/cart/count/${id}`, payload)
  }

  deleteProduct(userId: number, productId: number) {
    return this.http.delete(`${this.baseApiUrl}api/Profile/cart/${userId}/${productId}`).pipe(
      catchError(this.handleError)
    )
  }

  addToCart(payload: {orderId: number, productId: number, count: number}) {
    return this.http.post<Response>(`${this.baseApiUrl}api/OrderComposition`, payload)
      .pipe(
        tap(value => {
          console.log(value)
        }))
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
