import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../admin/navbar/navbar.component';
import {FilterComponent} from '../admin/filter/filter.component';
import {SidebarComponent} from '../admin/sidebar/sidebar.component';
import {ProductTableComponent} from '../admin/product-table/product-table.component';
import {ProductService} from '../../data/services/product.service';
import {Product} from '../../data/interfaces/product.interface';

@Component({
  selector: 'app-admin-page',
  imports: [
    SidebarComponent,
    NavbarComponent,
    FilterComponent,
    ProductTableComponent
  ],
  templateUrl: './admin-page.component.html',
  standalone: true,
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  productService = inject(ProductService)
  products: Product[] = []
  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products
      }
    )
  }
}
