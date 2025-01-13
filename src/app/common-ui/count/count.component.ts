import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-count',
  imports: [
    FormsModule
  ],
  templateUrl: './count.component.html',
  standalone: true,
  styleUrl: './count.component.scss'
})
export class CountComponent {
  @Output() changeCount = new EventEmitter<number>()
  @Input() count!: number
  constructor() {
  }
  inputValidate() {
    if (this.count > 9999) {
      this.count = 9999
      console.log(this.count)
    }
    if (this.count == null) {
      this.count = 1;
    }
  }
  inputLength(count: number) {
    if (this.count > 9999) {
      this.count = 9999
      count = this.count
    }
    if (this.count == null) {
      this.count = 1;
      count = this.count
    }
    this.changeCount.emit(this.count)
  }
  increase(count: number) {
    if (this.count < 9999) {
      this.count++
      this.changeCount.emit(this.count)
    }
  }
  decrease(count: number) {
    if (this.count > 1) {
      this.count--;
      this.changeCount.emit(this.count);
    }
  }
}
