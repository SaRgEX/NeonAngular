import {Component, effect, output, signal} from '@angular/core';
import {SvgIconComponent} from '../../svg-icon/svg-icon.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    SvgIconComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  hide = output<boolean>()
  hideMenu = signal<boolean>(false)
  constructor() {
    effect(() => {
      this.hide.emit(this.hideMenu())
    });
  }
}
