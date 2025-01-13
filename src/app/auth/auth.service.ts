import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {TokenResponse} from './auth.interface';
import {CookieService} from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import {Profile} from '../data/interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/';
  cookieService = inject(CookieService);
  token: string | null = null;
  login(payload: {login: string, password: string}) {
    return this.http.post<TokenResponse>(`${this.baseApiUrl}api/Auth/Login`, payload)
      .pipe(
        tap(val => {
          let decodedToken = jwtDecode<Profile>(val.accessToken!);
          this.token = val.accessToken;
          let userId = decodedToken.user.toString()
          this.cookieService.set('access_token', this.token);
          localStorage.setItem('role', decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
          localStorage.setItem('user_id', userId)
        })
      )
  }

  registration(payload: {login: string, password: string}) {
    return this.http.post<Response>(`${this.baseApiUrl}api/Auth/Registration`, payload)
  }

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('access_token');
    }
    return !!this.token;
  }

  get logout() {
    this.cookieService.delete('access_token');
    localStorage.removeItem('user_id');
    this.token = null;
    return true;
  }

  constructor() {
  }
}
