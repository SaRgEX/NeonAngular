import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../data/interfaces/product.interface';
import { ProductService } from '../../data/services/product.service';

@Component({
  selector: 'app-search-result',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './search-result.component.html',
  standalone: true,
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  @Input() product!: Product;
  @Output() onRedirectEvent = new EventEmitter<string>();
  onClickResult(text: string) {
    console.log(text)
    this.onRedirectEvent.emit(text)
  }
}
