import {Component, Input, input} from '@angular/core';
import {Order} from '../../data/interfaces/order.interface';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  standalone: true,
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  @Input() order!: Order;
}
