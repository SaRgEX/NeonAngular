import {Component, effect, inject, Input, signal} from '@angular/core';
import {Category} from '../../../data/interfaces/category.interface';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../../data/services/category.service';

@Component({
  selector: 'app-category-change',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './category-change.component.html',
  standalone: true,
  styleUrl: './category-change.component.scss'
})
export class CategoryChangeComponent {
  @Input() category!: Category
  checked = signal<boolean>(false);
  categoryService = inject(CategoryService)
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required)
  })

  constructor() {
    effect(() => {
      this.form.patchValue(this.category);
    });
  }

  save() {
    if (this.form.valid) {
      this.categoryService.updateCategory(this.category.id, this.form.value)
        .subscribe(() => window.location.reload())
    }
  }
}
