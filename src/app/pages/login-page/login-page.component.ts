import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {LoginComponent} from '../../common-ui/login/login.component';
import {RegistrationComponent} from '../../common-ui/registration/registration.component';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    LoginComponent,
    RegistrationComponent
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  login = signal<boolean>(true);
}
