import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router);

  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(res => {
          this.router.navigate(['profile/me']);
        })
    }
  }
}
