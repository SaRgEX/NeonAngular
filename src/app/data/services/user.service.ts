import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/';
  constructor() { }

  createUser(payload: {name: string, password: string, isAdmin: boolean}) {
    return this.http.post(`${this.baseApiUrl}api/User`, payload);
  }
}
