import {Component, inject, Input, signal} from '@angular/core';
import {ProductChangeComponent} from '../product-change/product-change.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SvgIconComponent} from '../../svg-icon/svg-icon.component';
import {Category} from '../../../data/interfaces/category.interface';
import {CategoryService} from '../../../data/services/category.service';
import {CategoryChangeComponent} from '../category-change/category-change.component';

@Component({
  selector: 'app-category-table',
  imports: [
    ProductChangeComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    CategoryChangeComponent
  ],
  templateUrl: './category-table.component.html',
  standalone: true,
  styleUrl: './category-table.component.scss'
})
export class CategoryTableComponent {
  @Input() categories!: Category[]
  checked = signal<boolean>(false)
  isEditing = signal<boolean>(false)
  openCreation = signal<boolean>(false)
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required)
  })

  onSubmit() {
    if (this.form.valid) {
      this.categoryService.addCategory(this.form.value)
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
  categoryService = inject(CategoryService)
  deleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      window.location.reload()
      })
  }
}
