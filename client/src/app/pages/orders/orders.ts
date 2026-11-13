import { Component, PLATFORM_ID, inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private platformId = inject(PLATFORM_ID);
  orders: any[] = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const stored = JSON.parse(
          localStorage.getItem('prodify_orders_v1') || '[]'
        );
        if (Array.isArray(stored) && stored.length > 0) {
          this.orders = stored;
          return;
        }
      } catch {
        // fallback below
      }
    }

    this.orders = [
      {
        orderNumber: 'PD-842910',
        date: '2026-11-08',
        customer: 'Asher Brown',
        itemsCount: 2,
        total: 70,
        status: 'Delivered',
      },
      {
        orderNumber: 'PD-793104',
        date: '2026-10-24',
        customer: 'Asher Brown',
        itemsCount: 1,
        total: 299,
        status: 'Delivered',
      },
    ];
  }
}
