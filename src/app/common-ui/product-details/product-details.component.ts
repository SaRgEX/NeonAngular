import {Component, inject, Input} from '@angular/core';
import {Product} from '../../data/interfaces/product.interface';
import {CartService} from '../../data/services/cart.service';
import {NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {CountComponent} from '../count/count.component';

@Component({
  selector: 'app-product-details',
  imports: [
    NgStyle,
    FormsModule,
    SvgIconComponent,
    CountComponent
  ],
  templateUrl: './product-details.component.html',
  standalone: true,
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  cartService = inject(CartService)
  count: number = 1;
  display = 'flex';
  infoDisplay = 'none'
  constructor() {
  }
  public changeCounts(change: number) {
    this.count = change;
  }
  changeCount() {
    this.infoDisplay = 'flex'
    this.display = 'none'
  }
  addToCart() {
    const cartId = localStorage.getItem('cartId')!;
    let payload = {
      orderId: parseInt(cartId),
      productId: this.product.id,
      count: this.count
    }
    this.cartService.addToCart(payload).subscribe()
  }
  onError() {
    this.product.imagePath = 'https://placeholder.apptor.studio/200/200/product1.png'
  }
}
