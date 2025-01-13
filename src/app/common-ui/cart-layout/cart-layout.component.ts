import {Component, inject, Input} from '@angular/core';
import {Cart} from '../../data/interfaces/cart.interface';
import {CartComponent} from '../cart/cart.component';
import {NgStyle} from '@angular/common';
import {CartService} from '../../data/services/cart.service';


@Component({
  selector: 'app-cart-layout',
  imports: [
    CartComponent,
    NgStyle
  ],
  templateUrl: './cart-layout.component.html',
  standalone: true,
  styleUrl: './cart-layout.component.scss'
})
export class CartLayoutComponent {
  @Input() cart!: Cart
  justify = "center"
  userId = parseInt(localStorage.getItem('user_id')!);
  cartService = inject(CartService)
  count = 0
  totalPrice = 0

  constructor() {
    setTimeout(() => {
      this.TotalPrice
      this.TotalCount
      this.cart.compositions.forEach(item => {
        this.privious.set(item.id, item.count)
      });
    }, 1000)
  }

  get TotalCount() {
    this.cart.compositions.forEach(item => {
      this.count += item.count;
    })
    return this.count
  }

  get TotalPrice(): number {
    this.totalPrice = 0;
    this.cart.compositions.forEach(item => {
      this.totalPrice += item.product.cost * item.count;
    })
    return this.totalPrice
  }

  privious = new Map<number, number>()

  public changeCounts([change, productId]: [number, number]) {
    let composition = this.cart.compositions.filter(item => item.product.id === productId)[0]
    this.totalPrice -= composition.product.cost * this.privious.get(composition.id)!
    this.totalPrice += composition.product.cost * change
    this.count -= this.privious.get(composition.id)!
    this.count += change
    this.privious.delete(composition.id)
    this.privious.set(composition.id, change)
  }

  public deleteComposition(id: number) {
    this.count -= this.privious.get(id)!
    console.log(id)
    this.totalPrice -= this.cart.compositions.filter(composition => composition.id === id)[0].product.cost * this.privious.get(id)!
    this.cart.compositions = this.cart.compositions.filter(composition => composition.id!== id)
    this.privious.delete(id)
  }

  public createOrder() {
    this.cartService.cartPay(this.userId).subscribe(
      () => {
        console.log('Order created successfully')
        this.cart.compositions = []
        this.totalPrice = 0
        this.count = 0
      },
      error => {
        console.error('Error creating order:', error)
      }
    )
  }

  get Justify() {
    if (!this.cart?.compositions) {
      this.justify = "flex-start"
    }
    return this.justify
  }
}
