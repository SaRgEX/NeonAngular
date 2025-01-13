import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Category } from '../../data/interfaces/category.interface';
import { CategoryService } from '../../data/services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filter',
  imports: [RouterLink],
  templateUrl: './filter.component.html',
  standalone: true,
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() Category!: Category;
  @Output() onRedirectEvent = new EventEmitter<string>();
  categorySerice = inject(CategoryService)
  onClickResult(text: string) {
    this.onRedirectEvent.emit(text)
  }
}
