import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  filter = 'all';

  categories = [
    { label: 'All', value: 'all' },
    { label: 'Stationery', value: 'stationery' },
    { label: 'Fitness', value: 'fitness' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Wearables', value: 'wearables' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'Audio', value: 'audio' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Home', value: 'home' },
    { label: 'Kitchen', value: 'kitchen' },
    { label: 'Photography', value: 'photography' },
    { label: 'Outdoors', value: 'outdoors' },
  ];

  showAllCategories = false;

  @Output()
  filterEvent: EventEmitter<string> = new EventEmitter();

  selectCategory(value: string): void {
    this.filter = value;
    this.filterEvent.emit(this.filter);
  }

  get visibleCategories() {
    return this.showAllCategories ? this.categories : this.categories.slice(0, 7);
  }
}
