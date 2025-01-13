import {Component, inject, Input, input, signal, WritableSignal} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router);
  @Input() login!: WritableSignal<boolean>
  isPasswordVisible = signal<boolean>(false)

  onClick() {
    this.login.set(false)
  }

  form: FormGroup = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(res => {
          this.router.navigate(['me/profile']);
        })
    }
  }
}
