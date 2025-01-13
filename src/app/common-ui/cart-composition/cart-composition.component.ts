import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Composition} from '../../data/interfaces/composition.interface';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {CountComponent} from '../count/count.component';
import {CartService} from '../../data/services/cart.service';

@Component({
  selector: 'app-cart-composition',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    SvgIconComponent,
    CountComponent
  ],
  templateUrl: './cart-composition.component.html',
  standalone: true,
  styleUrl: './cart-composition.component.scss'
})
export class CartCompositionComponent {
  @Input() composition!: Composition;
  @Output() countChange = new EventEmitter<[number, number]>();
  @Output() deleteComposition = new EventEmitter<number>();
  cartService = inject(CartService)
  count = 1;
  userId = parseInt(localStorage.getItem('user_id')!);

  constructor() {
    setTimeout(() => {
      this.count = this.composition.count;
    }, 500);
  }

  public changeCounts(change: number) {
    this.count = change;
    this.countChange.emit([this.count, this.composition.product.id]);
    let payload = {
      productId: this.composition.product.id,
      count: this.count,
    }
    this.cartService.changeCountProduct(this.userId, payload).subscribe()
  }

  deleteProduct() {
    this.cartService.deleteProduct(this.userId, this.composition.product.id).subscribe();
    this.deleteComposition.emit(this.composition.id);
  }
}
