import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { CartService } from '../../services/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar, Footer],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cartService = inject(CartService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private platformId = inject(PLATFORM_ID);

  orderCompleted = false;
  orderNumber = '';
  placedTotal = 0;

  shippingMethod: 'standard' | 'express' = 'standard';
  paymentMethod: 'card' | 'cod' | 'paypal' = 'card';

  customer = {
    firstName: 'Asher',
    lastName: 'Brown',
    email: 'asher.brown@prodify.com',
    phone: '+1 (537) 315-1481',
    address: '5975 Eget Avenue, Suite 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    cardName: 'Asher M. Brown',
    cardNumber: '',
    expiry: '',
    cvc: '',
    notes: '',
  };

  get shippingFee(): number {
    if (this.shippingMethod === 'express') return 18;
    return this.cartService.shipping();
  }

  get grandTotal(): number {
    const sub = this.cartService.subtotal();
    const tax = this.cartService.tax();
    return Math.round((sub + tax + this.shippingFee) * 100) / 100;
  }

  placeOrder(form: NgForm): void {
    if (form.invalid) {
      this.toast.warning('Please complete the required shipping details');
      return;
    }

    if (this.cartService.items().length === 0) {
      this.toast.warning('Your cart is empty');
      return;
    }

    const randomId = Math.floor(100000 + Math.random() * 900000);
    this.orderNumber = `PD-${randomId}`;
    this.placedTotal = this.grandTotal;

    if (isPlatformBrowser(this.platformId)) {
      try {
        const existing = JSON.parse(
          localStorage.getItem('prodify_orders_v1') || '[]'
        );
        existing.unshift({
          orderNumber: this.orderNumber,
          date: new Date().toISOString(),
          customer: `${this.customer.firstName} ${this.customer.lastName}`,
          email: this.customer.email,
          itemsCount: this.cartService.totalItems(),
          total: this.placedTotal,
          status: 'Confirmed',
          items: this.cartService.items(),
        });
        localStorage.setItem('prodify_orders_v1', JSON.stringify(existing));
      } catch {
        // ignore storage errors
      }
    }

    this.cartService.clearCart();
    this.orderCompleted = true;
    this.toast.success(
      `Order ${this.orderNumber} confirmed!`,
      'Thank you for your order'
    );
  }
}

