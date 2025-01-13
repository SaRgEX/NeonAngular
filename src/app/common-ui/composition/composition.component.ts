import {Component, Input} from '@angular/core';
import {Composition} from '../../data/interfaces/composition.interface';
import {formatDate} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-composition',
  imports: [
    RouterLink
  ],
  templateUrl: './composition.component.html',
  standalone: true,
  styleUrl: './composition.component.scss'
})
export class CompositionComponent {
  @Input() composition!: Composition;
  formatedDate!: string;
  ngOnInit() {
    if (this.composition != null) {
      this.formatedDate = formatDate(this.composition.createdAt, "dd-MM-YYYY, hh:mm", "ru-RU")
    }
  }
}
