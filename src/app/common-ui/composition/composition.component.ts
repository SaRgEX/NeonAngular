import {Component, Input} from '@angular/core';
import {Composition} from '../../data/interfaces/composition.interface';

@Component({
  selector: 'app-composition',
  imports: [],
  templateUrl: './composition.component.html',
  standalone: true,
  styleUrl: './composition.component.scss'
})
export class CompositionComponent {
  @Input() composition!: Composition;


}
