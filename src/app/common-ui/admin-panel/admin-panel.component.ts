import {Component, inject, Input, signal} from '@angular/core';
import {FilterComponent} from '../admin/filter/filter.component';
import {NavbarComponent} from '../admin/navbar/navbar.component';
import {ProductTableComponent} from '../admin/product-table/product-table.component';
import {Product} from '../../data/interfaces/product.interface';
import {ProductService} from '../../data/services/product.service';

@Component({
  selector: 'app-admin-panel',
  imports: [
    FilterComponent,
    NavbarComponent,
    ProductTableComponent
  ],
  templateUrl: './admin-panel.component.html',
  standalone: true,
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  hide = signal<boolean>(false)
  @Input() products!: Product[]
  productService = inject(ProductService)
  hideSidebar(change: boolean) {
    this.hide.set(change)
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products
      }
    )
  }
}
