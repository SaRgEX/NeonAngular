import {Component, inject} from '@angular/core';
import {OrderComponent} from '../../common-ui/order/order.component';
import {CartComponent} from '../../common-ui/cart/cart.component';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {OrderService} from '../../data/services/order.service';
import {Cart} from '../../data/interfaces/cart.interface';
import {Order} from '../../data/interfaces/order.interface';
import {OrderLayoutComponent} from '../../common-ui/order-layout/order-layout.component';
import {CartLayoutComponent} from '../../common-ui/cart-layout/cart-layout.component';
import {CartService} from '../../data/services/cart.service';
import {tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-profile-page',
  imports: [
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    OrderLayoutComponent,
    CartLayoutComponent,
    RouterLink
  ],
  templateUrl: './profile-page.component.html',
  standalone: true,
  styleUrl: './profile-page.component.scss'
})

export class ProfilePageComponent {
  click?: CartLayoutComponent | OrderLayoutComponent;
  cartService = inject(CartService);
  orderService = inject(OrderService);
  cookieService = inject(CookieService);
  orders: Order[] = [];
  cart!: Cart;
  role = localStorage.getItem('role');
  userId = localStorage.getItem('user_id')!
  onButtonClick($event: CartLayoutComponent | OrderLayoutComponent) {
    this.click = $event;
  }

  constructor() {
    this.cartService.getCart(parseInt(this.userId))
      .subscribe(val => {
        this.cart = val
        localStorage.setItem('cartId', val.id.toString())
      })
    this.orderService.getOrders(parseInt(this.userId))
      .subscribe(val => {
        this.orders = val;
      });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('cartId');
    this.cookieService.delete('access_token');
    localStorage.removeItem('role');
    window.location.reload();
  }

  protected readonly CartLayout: CartLayoutComponent = new CartLayoutComponent();
  protected readonly OrderLayout: OrderLayoutComponent = new OrderLayoutComponent();
}
