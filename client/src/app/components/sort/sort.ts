import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sort.html',
  styleUrl: './sort.css',
})
export class Sort {
  sort = '';

  @Output() sortEvent: EventEmitter<string> = new EventEmitter();

  sorting(): void {
    this.sortEvent.emit(this.sort);
  }
}
