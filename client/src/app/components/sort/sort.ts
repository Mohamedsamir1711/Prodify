import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort',
  imports: [FormsModule],
  templateUrl: './sort.html',
  styleUrl: './sort.css',
})
export class Sort {
  sort: string = "";

  @Output() sortEvent: EventEmitter<string> = new EventEmitter();

  sorting() {
    console.log(this.sort);
    this.sortEvent.emit(this.sort);
  }
}
