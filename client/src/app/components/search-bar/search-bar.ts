import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  search = '';

  @Output()
  searchEvent: EventEmitter<string> = new EventEmitter<string>();

  sendValue(): void {
    this.searchEvent.emit(this.search);
  }

  clearSearch(): void {
    this.search = '';
    this.searchEvent.emit('');
  }
}
