import {Component, inject} from '@angular/core';
import {OrderService} from '../../data/services/order.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap, take} from 'rxjs';
import {AsyncPipe, formatDate} from '@angular/common';
import {CompositionComponent} from '../../common-ui/composition/composition.component';
import {Order} from '../../data/interfaces/order.interface';

@Component({
  selector: 'app-order-page',
  imports: [
    AsyncPipe,
    CompositionComponent
  ],
  templateUrl: './order-page.component.html',
  standalone: true,
  styleUrl: './order-page.component.scss'
})
export class OrderPageComponent {
  orderService = inject(OrderService);
  router = inject(ActivatedRoute);
  order$ = this.router.params
    .pipe(switchMap(({id}) => {
      return this.orderService.getOrder(id)
    }));
  constructor() {
  }
}
