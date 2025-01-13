import { Component, EventEmitter, Input } from '@angular/core';
import { Product } from '../../data/interfaces/product.interface';
import { ProductService } from '../../data/services/product.service';
import { FormsModule } from '@angular/forms';
import { SearchResultComponent } from '../search-result/search-result.component';
import { Category } from '../../data/interfaces/category.interface';
import { CategoryService } from '../../data/services/category.service';
import { FilterComponent } from '../filter/filter.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, SearchResultComponent, FilterComponent, NgStyle],
  templateUrl: './search-bar.component.html',
  standalone: true,
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  public query: string = '';
  searchResults: Product[] = [];
  display: string = 'none';
  displayCategories: boolean = false;
  public categories: Category[] = [];
  public selectedCategory: string = '';

  @Input() productSelected = new EventEmitter<number>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().subscribe(val => this.categories = val);
  }

  onClick() {
    this.displayCategories = !this.displayCategories;
  }

  async onSearch(): Promise<void> {
    this.display = 'block'
    if (!this.query.trim()) {
      this.searchResults = [];
      this.display = 'none'
      return;
    }

    const queryLower = this.query.toLowerCase();

    this.productService.getProductByName(queryLower).subscribe(val => this.searchResults = val)
    if (this.searchResults.length == 0) this.display = 'none'
  }

  clearResults(text: string) {
    this.query = '';
    this.searchResults = []
    this.display = 'none'
    console.log(text)
  }
}
