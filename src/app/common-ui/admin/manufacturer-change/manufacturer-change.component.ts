import {Component, effect, inject, Input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Manufacturer} from '../../../data/interfaces/manufacturer.interface';
import {ManufacturerService} from '../../../data/services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-change',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './manufacturer-change.component.html',
  standalone: true,
  styleUrl: './manufacturer-change.component.scss'
})
export class ManufacturerChangeComponent {
  @Input() manufacturer!: Manufacturer
  checked = signal<boolean>(false);
  manufacturerService = inject(ManufacturerService)
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required)
  })

  constructor() {
    effect(() => {
      this.form.patchValue(this.manufacturer);
    });
  }

  save() {
    if (this.form.valid) {
      this.manufacturerService.updateManufacturer(this.manufacturer.id, this.form.value)
        .subscribe(() => window.location.reload())
    }
  }
}
