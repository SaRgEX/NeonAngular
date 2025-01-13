import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/';
  constructor() { }

  getOrders(id: number) {
    return this.http.get<Order[]>(`${this.baseApiUrl}api/Profile/orders/${id}`)
  }

  getOrder(id: number) {
    return this.http.get<Order>(`${this.baseApiUrl}api/Order/${id}`)
  }


}
