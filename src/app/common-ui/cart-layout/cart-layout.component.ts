import {Component, computed, effect, inject, Input, Signal, signal, WritableSignal} from '@angular/core';
import {Cart} from '../../data/interfaces/cart.interface';
import {CartComponent} from '../cart/cart.component';
import {NgStyle} from '@angular/common';
import {Composition} from '../../data/interfaces/composition.interface';
import {toObservable} from '@angular/core/rxjs-interop';
import {CartService} from '../../data/services/cart.service';
import {pipe, take} from 'rxjs';

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

  public changeCounts([change, productId]: [number, number]) {
    let composition = this.cart.compositions.filter(item => item.product.id === productId)[0]
    // this.totalPrice -= composition.product.cost * composition.count;
    this.totalPrice += composition.product.cost * change
    console.log(change, productId, this.totalPrice)
  }

  get Justify() {
    if (!this.cart?.compositions) {
      this.justify = "flex-start"
    }
    return this.justify
  }
}
