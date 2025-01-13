import {Component, Input} from '@angular/core';
import {Product} from '../../../data/interfaces/product.interface';

@Component({
  selector: 'app-product-table',
  imports: [],
  templateUrl: './product-table.component.html',
  standalone: true,
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  @Input() products!: Product[];

}
