import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);
  baseApiUrl = 'https://localhost:7291/'

  constructor() { }

  getCategories() {
    return this.http.get<Category[]>(`${this.baseApiUrl}api/Category`)
  }
}
