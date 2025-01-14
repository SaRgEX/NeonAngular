import {Component, effect, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../data/services/user.service';
import {SwitchComponent} from '../../switch/switch.component';

@Component({
  selector: 'app-user-panel',
  imports: [
    ReactiveFormsModule,
    SwitchComponent
  ],
  templateUrl: './user-panel.component.html',
  standalone: true,
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent {
  userService = inject(UserService)
  role = signal<boolean>(false)
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor() { }

  createUser() {
    this.form.addControl('isAdmin', new FormControl(this.role()));
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe()
    }
  }
}
