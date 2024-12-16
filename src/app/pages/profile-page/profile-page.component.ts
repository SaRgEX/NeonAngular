import {Component, EventEmitter, Output, output} from '@angular/core';
import {OrderComponent} from '../../common-ui/order/order.component';
import {CartComponent} from '../../common-ui/cart/cart.component';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';


@Component({
  selector: 'app-profile-page',
  imports: [
    NgSwitch,
    OrderComponent,
    NgSwitchDefault,
    CartComponent,
    NgSwitchCase
  ],
  templateUrl: './profile-page.component.html',
  standalone: true,
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  click?: OrderComponent | CartComponent;
  onButtonClick($event: OrderComponent | CartComponent) {
    this.click = $event;
  }

  protected readonly OrderComponent = OrderComponent;
  protected readonly CartComponent = CartComponent;
}
