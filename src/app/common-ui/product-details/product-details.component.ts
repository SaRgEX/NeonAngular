import {Component, Input} from '@angular/core';
import {Product} from '../../data/interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  standalone: true,
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  constructor() {
  }

  onError() {
    this.product.imagePath = 'https://placeholder.apptor.studio/200/200/product1.png'
  }
}
