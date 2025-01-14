import {Component, effect, inject, Input, signal, WritableSignal} from '@angular/core';
import {Product} from '../../../data/interfaces/product.interface';
import {ProductService} from '../../../data/services/product.service';
import {SvgIconComponent} from '../../svg-icon/svg-icon.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-change',
  imports: [
    SvgIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './product-change.component.html',
  standalone: true,
  styleUrl: './product-change.component.scss'
})
export class ProductChangeComponent {
  @Input() product!: Product
  @Input() extendedInfoMap!: Map<number, WritableSignal<boolean>>
  checked = signal<boolean>(false)
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    manufacturerId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    count: new FormControl(null, Validators.required),
    cost: new FormControl(null, [Validators.required]),
    description: new FormControl(null, Validators.required),
    imagePath: new FormControl(null, Validators.required)
  })
  constructor() {
    effect(() => {
      this.form.patchValue(this.product)
    });
  }
  productService = inject(ProductService)
  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId)
      .subscribe(res => {
        window.location.reload()
      })
  }

  save() {
    if (this.form.valid) {
      this.productService.updateProduct(this.product.id, this.form.value)
       .subscribe(res => {
          window.location.reload()
        })
    }
  }

  showDescription(productId: number) {
    let s = this.extendedInfoMap.get(productId)!;
    s.set(!s())

  }
}
