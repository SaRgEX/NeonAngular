import {Component, input, Input} from '@angular/core';
import {Product} from '../../data/interfaces/product.interface';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink,
  ],
  templateUrl: './product-card.component.html',
  standalone: true,
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!:Product;
  onError() {
    this.product.imagePath = 'https://placeholder.apptor.studio/200/200/product1.png'
  }
}
