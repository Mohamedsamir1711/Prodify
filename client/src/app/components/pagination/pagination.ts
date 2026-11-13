import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PaginatorModule, Paginator],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination implements OnInit {
  first = 0;
  rows = 6;

  @Input()
  total!: number;

  @Output()
  paginationEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 6;
    this.paginationEvent.emit({
      page: (event.page ?? 0) + 1,
      limit: event.rows ?? 6,
    });
  }
}
