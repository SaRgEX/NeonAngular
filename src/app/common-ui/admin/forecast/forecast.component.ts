import { Component } from '@angular/core';
import { ChartComponent } from "./chart/chart.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
  standalone: true,
  imports: [ChartComponent, SidebarComponent, NavbarComponent]
})
export class ForecastComponent {
  constructor() {
  }
}
