import {Component, inject, Input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../../data/services/category.service';
import {Manufacturer} from '../../../data/interfaces/manufacturer.interface';
import {ManufacturerService} from '../../../data/services/manufacturer.service';
import {CategoryChangeComponent} from '../category-change/category-change.component';
import {SvgIconComponent} from '../../svg-icon/svg-icon.component';
import {ManufacturerChangeComponent} from '../manufacturer-change/manufacturer-change.component';

@Component({
  selector: 'app-manufacturer-table',
  imports: [
    CategoryChangeComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    ManufacturerChangeComponent
  ],
  templateUrl: './manufacturer-table.component.html',
  standalone: true,
  styleUrl: './manufacturer-table.component.scss'
})
export class ManufacturerTableComponent {
  @Input() manufacturers!: Manufacturer[]
  checked = signal<boolean>(false)
  isEditing = signal<boolean>(false)
  openCreation = signal<boolean>(false)
  manufacturerService = inject(ManufacturerService)
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required)
  })

  onSubmit() {
    if (this.form.valid) {
      this.manufacturerService.addManufacturer(this.form.value)
        .subscribe(() => {
          window.location.reload()
        })
    }
  }
  get Open() {
    return this.openCreation() ? 'flex' : 'none';
  }
  get Close() {
    return this.openCreation()? 'none' : 'flex';
  }
  deleteCategory(categoryId: number) {
    this.manufacturerService.deleteManufacturer(categoryId).subscribe(() => {
      window.location.reload()
    })
  }
}
