import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() hide!: boolean
  get Test() {
    return this.hide ? 'none' : 'block';
  }
}
