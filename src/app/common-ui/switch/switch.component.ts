import {Component, Input, output, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-switch',
  imports: [],
  templateUrl: './switch.component.html',
  standalone: true,
  styleUrl: './switch.component.scss'
})
export class SwitchComponent {
  @Input() checked!: WritableSignal<boolean>
}
