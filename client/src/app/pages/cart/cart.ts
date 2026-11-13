import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { CartService, CartItem } from '../../services/cart-service';
import { IProduct } from '../../models/iproduct';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar, Footer],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService);
  private router = inject(Router);
  private toast = inject(ToastrService);

  promoCode = '';
  discountRate = 0;

  recommendedProducts: IProduct[] = [
    {
      _id: 'sample-1',
      name: 'Hardcover Bullet Journal',
      price: 25,
      description: 'Premium dotted paper notebook with a lay-flat spine.',
      image:
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      category: 'Stationery',
      quantity: 30,
      tags: ['stationery'],
      isdeleted: false,
    },
    {
      _id: 'sample-4',
      name: 'Genuine Leather Wallet',
      price: 45,
      description: 'Minimalist genuine leather bifold wallet with RFID protection.',
      image:
        'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
      category: 'Fashion',
      quantity: 18,
      tags: ['fashion'],
      isdeleted: false,
    },
    {
      _id: 'sample-3',
      name: 'High-Capacity Power Bank',
      price: 35,
      description: '20000mAh portable charger with fast-charge output.',
      image:
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80',
      category: 'Electronics',
      quantity: 45,
      tags: ['electronics'],
      isdeleted: false,
    },
  ];

  updateQty(item: CartItem, delta: number): void {
    const next = item.qty + delta;
    this.cartService.updateQuantity(item.product._id, next);
  }

  removeItem(productId: string, name: string): void {
    this.cartService.removeFromCart(productId);
    this.toast.info(`${name} removed from your bag`);
  }

  clearAll(): void {
    this.cartService.clearCart();
    this.toast.info('Shopping bag cleared');
  }

  applyPromo(): void {
    const code = this.promoCode.trim().toUpperCase();
    if (code === 'PRODIFY10' || code === 'SAVE10') {
      this.discountRate = 0.1;
      this.toast.success('10% promo discount applied!', 'Promo Code');
    } else if (!code) {
      this.toast.warning('Enter a promo code first');
    } else {
      this.discountRate = 0;
      this.toast.error('Invalid promo code. Try PRODIFY10');
    }
  }

  get discountAmount(): number {
    return Math.round(this.cartService.subtotal() * this.discountRate * 100) / 100;
  }

  get finalTotal(): number {
    return Math.max(
      0,
      Math.round((this.cartService.total() - this.discountAmount) * 100) / 100
    );
  }

  quickAdd(product: IProduct): void {
    this.cartService.addToCart(product, 1);
    this.toast.success(`${product.name} added to your bag`);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}

