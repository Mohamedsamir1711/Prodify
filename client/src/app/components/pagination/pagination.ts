import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  imports: [PaginatorModule, Paginator],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination implements OnInit {

  ngOnInit(): void {
    this.paginationEvent.emit({page: 0, limit: this.rows});
  }

   first: number = 0;
   rows: number = 10;
   @Input()
   total!:number;

   @Output()
   paginationEvent: EventEmitter<any> = new EventEmitter();

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 3;
        this.paginationEvent.emit({page: (event.page ?? 0) + 1, limit: event.rows ?? 3});
    }
}
