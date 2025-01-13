import {AuthService} from './auth.service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';

export const canActivateAuth = () => {
  let authService = inject(AuthService)
  const isLoggedIn = authService.isAuth;

  if (isLoggedIn) {
    return true
  }

  return inject(Router).createUrlTree(['/login'])
}

export const isAdmin = () => {
  let role = localStorage.getItem('role');
  console.log(role)
  if (role === 'Admin') {
    return true;
  }
  return inject(Router).createUrlTree(['/'])
}
