import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  filter: string = "";

  @Output()
  filterEvent: EventEmitter<string> = new EventEmitter()

  filtering() {
    this.filterEvent.emit(this.filter)
  }


}
