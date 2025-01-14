import {Component, inject} from '@angular/core';
import {CategoryTableComponent} from "../category-table/category-table.component";
import {Category} from '../../../data/interfaces/category.interface';
import {ManufacturerService} from '../../../data/services/manufacturer.service';
import {Manufacturer} from '../../../data/interfaces/manufacturer.interface';
import {ManufacturerTableComponent} from '../manufacturer-table/manufacturer-table.component';

@Component({
  selector: 'app-manufacturer-panel',
  imports: [
    CategoryTableComponent,
    ManufacturerTableComponent
  ],
  templateUrl: './manufacturer-panel.component.html',
  standalone: true,
  styleUrl: './manufacturer-panel.component.scss'
})
export class ManufacturerPanelComponent {
  manufacturers: Manufacturer[] = [];
  manufacturerService = inject(ManufacturerService)

  constructor() {
    this.manufacturerService.getManufacturer()
      .subscribe((categories) =>
        this.manufacturers = categories
      )
  }
}
