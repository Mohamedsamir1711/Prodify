import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IProduct } from '../models/iproduct';

export interface CartItem {
  product: IProduct;
  qty: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private storageKey = 'prodify_cart_v1';

  items = signal<CartItem[]>([]);

  totalItems = computed(() =>
    this.items().reduce((acc, item) => acc + item.qty, 0)
  );

  subtotal = computed(() =>
    this.items().reduce((acc, item) => acc + item.product.price * item.qty, 0)
  );

  shipping = computed(() => {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    return sub >= 120 ? 0 : 12;
  });

  tax = computed(() => Math.round(this.subtotal() * 0.08 * 100) / 100);

  total = computed(() =>
    Math.round((this.subtotal() + this.shipping() + this.tax()) * 100) / 100
  );

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.items.set(parsed);
        }
      }
    } catch {
      // ignore corrupted storage
    }
  }

  private saveToStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    } catch {
      // ignore storage quota errors
    }
  }

  addToCart(product: IProduct, qty: number = 1): void {
    if (!product || !product._id) return;
    const current = [...this.items()];
    const existingIndex = current.findIndex((i) => i.product._id === product._id);
    if (existingIndex > -1) {
      current[existingIndex] = {
        ...current[existingIndex],
        qty: current[existingIndex].qty + qty,
      };
    } else {
      current.push({ product, qty });
    }
    this.items.set(current);
    this.saveToStorage();
  }

  updateQuantity(productId: string, qty: number): void {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const updated = this.items().map((item) =>
      item.product._id === productId ? { ...item, qty } : item
    );
    this.items.set(updated);
    this.saveToStorage();
  }

  removeFromCart(productId: string): void {
    this.items.set(this.items().filter((i) => i.product._id !== productId));
    this.saveToStorage();
  }

  clearCart(): void {
    this.items.set([]);
    this.saveToStorage();
  }
}

