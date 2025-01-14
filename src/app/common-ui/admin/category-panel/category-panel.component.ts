import {Component, inject} from '@angular/core';
import {CategoryTableComponent} from '../category-table/category-table.component';
import {CategoryService} from '../../../data/services/category.service';
import {Category} from '../../../data/interfaces/category.interface';

@Component({
  selector: 'app-category-panel',
  imports: [
    CategoryTableComponent
  ],
  templateUrl: './category-panel.component.html',
  standalone: true,
  styleUrl: './category-panel.component.scss'
})
export class CategoryPanelComponent {
  categoryService = inject(CategoryService);
  categories: Category[] = []
  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories => {
      this.categories = categories
      })
    )
  }
}
