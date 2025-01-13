import { Component } from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {RouterLink} from '@angular/router';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';

@Component({
    selector: 'app-header',
  imports: [
    SearchBarComponent,
    RouterLink,
    SvgIconComponent
  ],
    templateUrl: './header.component.html',
    standalone: true,
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
