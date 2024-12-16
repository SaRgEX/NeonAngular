import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {TokenResponse} from './auth.interface';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/';
  cookieService = inject(CookieService)
  token: string | null = null;
  login(payload: {name: string, password: string}) {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}api/User/login`, payload)
      .pipe(
        tap(val => {
          this.token = val.accessToken;
          this.cookieService.set('token', this.token);
        })
      )
  }

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
    }
    return !!this.token;
  }

  constructor() {
  }
}
