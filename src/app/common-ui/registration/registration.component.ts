import {Component, inject, Input, signal, WritableSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  standalone: true,
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  authService = inject(AuthService)
  router = inject(Router);
  @Input() login!: WritableSignal<boolean>
  isPasswordVisible = signal<boolean>(false)

  onClick() {
    this.login.set(true)
  }

  form: FormGroup = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit() {
    if (this.form.valid) {
      this.authService.registration(this.form.value)
        .subscribe(res => {
          this.login.set(true);
        })
    }
  }
}
