import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../data/services/product.service';
import { Product } from '../../data/interfaces/product.interface';
import { ProductCardComponent } from '../../common-ui/product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtered-products',
  imports: [ProductCardComponent],
  templateUrl: './filtered-products.component.html',
  standalone: true,
  styleUrl: './filtered-products.component.scss'
})
export class FilteredProductsComponent implements OnInit {
  productService = inject(ProductService)
  route = inject(ActivatedRoute);
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.getProducts()
        .subscribe(val => {
          this.products = val
        });
      this.filteredProducts = this.products.filter((product) => product.category === params['title'])
    })
  }
}
