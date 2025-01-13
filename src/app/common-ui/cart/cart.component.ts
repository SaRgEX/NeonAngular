import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cart} from '../../data/interfaces/cart.interface';
import {CartCompositionComponent} from '../cart-composition/cart-composition.component';

@Component({
  selector: 'app-cart',
  imports: [
    CartCompositionComponent
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() cart!: Cart;
  @Output() changeCount = new EventEmitter<[number, number]>();
  @Output() onDelete = new EventEmitter<number>();
  public changeCounts([change, productId]: [number, number]) {
    this.changeCount.emit([change, productId]);
  }

  public deleteComposition(id: number) {
    this.onDelete.emit(id);
  }
  constructor() {
  }

}
