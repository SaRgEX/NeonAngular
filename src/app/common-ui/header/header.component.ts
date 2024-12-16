import { Component } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-header',
  imports: [
    SearchBarComponent,
    RouterLink
  ],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
