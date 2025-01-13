import {Component, inject, Input, signal, WritableSignal} from '@angular/core';
import {Product} from '../../../data/interfaces/product.interface';
import {SvgIconComponent} from '../../svg-icon/svg-icon.component';
import {ProductService} from '../../../data/services/product.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-product-table',
  imports: [
    SvgIconComponent,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './product-table.component.html',
  standalone: true,
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  @Input() products!: Product[];
  extendedInfoMap = new Map<number, WritableSignal<boolean>>()
  checked = signal<boolean>(false)
  openCreation = signal<boolean>(false)
  extendedInfo = signal<boolean>(false)
  productService = inject(ProductService)

  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    manufacturer: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    cost: new FormControl(null, [Validators.required, Validators.min(0)]),
    count: new FormControl(null, [Validators.required, Validators.min(1)]),
    imagePath: new FormControl(null, Validators.required)
  })

  chooseAll() {
    this.checked.set(!this.checked())
  }
  openInfo() {
    this.extendedInfo.set(!this.extendedInfo())
  }
  get Open() {
    return this.openCreation() ? 'grid' : 'none';
  }
  get Close() {
    return this.openCreation()? 'none' : 'flex';
  }

  onSubmit() {
    if (this.form.valid) {
      this.productService.addProduct(this.form.value)
        .subscribe(res => {
          if (res.status !== 200) return
          this.loadProducts()
        })
    }
  }

  showDescription(productId: number) {
    let s = this.extendedInfoMap.get(productId)!;
    s.set(!s())

  }

  ngOnInit() {
    setTimeout(() => {
      this.products.forEach((product) => {
        this.extendedInfoMap.set(product.id, signal<boolean>(false))
      })
    }, 1000)
  }

  loadProducts() {
    this.productService.getProducts()
     .subscribe(products => this.products = products)
  }

}
