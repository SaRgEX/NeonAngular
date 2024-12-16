import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/';
  constructor() { }

  getOrder() {

  }


}
