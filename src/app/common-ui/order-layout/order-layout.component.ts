import {Component, Input, signal} from '@angular/core';
import {Order} from '../../data/interfaces/order.interface';
import {OrderComponent} from '../order/order.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-order-layout',
  imports: [
    OrderComponent,
    NgStyle
  ],
  templateUrl: './order-layout.component.html',
  standalone: true,
  styleUrl: './order-layout.component.scss'
})
export class OrderLayoutComponent {
  @Input() orders!: Order[]
  justify = "center"
  constructor() {
  }
  get Justify() {
    if (this.orders.length !== 0) {
      this.justify = "flex-start"
    }
    return this.justify
  }
}
