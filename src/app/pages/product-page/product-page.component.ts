import {Component, inject} from '@angular/core';
import {ProductDetailsComponent} from '../../common-ui/product-details/product-details.component';
import {ProductService} from '../../data/services/product.service';
import {switchMap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductDetailsComponent,
    AsyncPipe
  ],
  templateUrl: './product-page.component.html',
  standalone: true,
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  productService = inject(ProductService)
  route = inject(ActivatedRoute);
  product$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        return this.productService.getProduct(id)
}));

  constructor() {
  }
}
