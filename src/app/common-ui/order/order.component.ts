import {Component, Host, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {formatDate, NgStyle} from '@angular/common';
import '@angular/common/locales/global/ru';
import {Order} from '../../data/interfaces/order.interface';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  standalone: true,
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  @Input() order!: Order;
  router = inject(Router);
  formatedDate: string = "";
  constructor() {
  }

  onOrderClick() {
    this.router.navigate([`me/order/${this.order.id}`]);
  }
  ngOnInit() {
    if (this.order != null) {
      this.formatedDate = formatDate(this.order.createdAt, "dd-MM-YYYY, hh:mm", "ru-RU")
    }
  }
}
