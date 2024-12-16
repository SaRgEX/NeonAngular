import {Component, inject} from '@angular/core';
import {ProductService} from '../../data/services/product.service';
import {Product} from '../../data/interfaces/product.interface';
import {ProductCardComponent} from '../../common-ui/product-card/product-card.component';

@Component({
  selector: 'app-main-page',
  imports: [
    ProductCardComponent,
  ],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  productService = inject(ProductService)
  products: Product[] = [];

  constructor() {
    this.productService.getProducts()
      .subscribe(val => {
        this.products = val
      });
  }
}
