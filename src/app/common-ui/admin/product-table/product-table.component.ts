import {Component, inject, Input, signal, WritableSignal} from '@angular/core';
import {Product} from '../../../data/interfaces/product.interface';
import {SvgIconComponent} from '../../svg-icon/svg-icon.component';
import {ProductService} from '../../../data/services/product.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgStyle} from '@angular/common';
import {ProductChangeComponent} from '../product-change/product-change.component';

@Component({
  selector: 'app-product-table',
  imports: [
    SvgIconComponent,
    ReactiveFormsModule,
    NgStyle,
    ProductChangeComponent
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
  isEditing = signal<boolean>(false)
  productService = inject(ProductService)

  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    manufacturerId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    cost: new FormControl(null, [Validators.required]),
    count: new FormControl(null),
    description: new FormControl(null),
    imagePath: new FormControl(null, Validators.required)
  })

  chooseAll() {
    this.checked.set(!this.checked())
  }
  openInfo() {
    this.extendedInfo.set(!this.extendedInfo())
  }
  get Open() {
    return this.openCreation() ? 'flex' : 'none';
  }
  get Close() {
    return this.openCreation()? 'none' : 'flex';
  }

  onSubmit() {
    console.log("wait")
    console.log(this.form.value)
    console.log(this.form.valid)
    if (this.form.valid) {
      this.productService.addProduct(this.form.value)
        .subscribe(res => {
          window.location.reload()
        })
    }
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId)
     .subscribe(res => {
        window.location.reload()
      })
  }

  changeProduct() {

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
