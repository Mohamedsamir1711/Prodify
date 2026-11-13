import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { IProduct } from '../../models/iproduct';
import { ToastrService } from 'ngx-toastr';

export interface DealSlide {
  id: string;
  discountBadge: string;
  titleLine1: string;
  titleLine2: string;
  category: string;
  description: string;
  oldPrice: number;
  price: number;
  image: string;
  btnColor: string;
}

@Component({
  selector: 'app-featured-deals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-deals.html',
  styleUrl: './featured-deals.css',
})
export class FeaturedDeals {
  cartService = inject(CartService);
  private toast = inject(ToastrService);
  private router = inject(Router);

  currentIndex = 0;

  deals: DealSlide[] = [
    {
      id: 'deal-astra-watch',
      discountBadge: '50% OFF',
      titleLine1: 'Astra Smart',
      titleLine2: 'Watch Pro',
      category: 'Wearables',
      description:
        'Astra Smart Watch Pro. Your ultimate health and productivity companion. Experience seamless fitness tracking, heart monitoring, and instant notifications on a stunning AMOLED display. Crafted from aerospace-grade titanium. LIMITED TIME OFFER: Get this exclusive price today!',
      oldPrice: 599,
      price: 299,
      image: 'assets/fontawesome/images/2.png',
      btnColor: '#6d35f0',
    },
    {
      id: 'deal-quantum-book',
      discountBadge: '40% OFF',
      titleLine1: 'Quantum',
      titleLine2: 'Book X1 Pro',
      category: 'Electronics',
      description:
        'Quantum Book X1 Pro. Your ultimate computing powerhouse. Experience blazing-fast performance with the latest-gen processor, stunning 4K OLED display, and all-day battery life. Crafted from aerospace-grade aluminum. LIMITED TIME OFFER: Get this exclusive price today!',
      oldPrice: 899,
      price: 499,
      image: 'assets/fontawesome/images/1.png',
      btnColor: '#d96b27',
    },
    {
      id: 'deal-prox-ultra',
      discountBadge: '35% OFF',
      titleLine1: 'Pro-X 24 Ultra',
      titleLine2: '(512GB)',
      category: 'Mobile',
      description:
        'Revolutionize your mobile experience with the cutting-edge cinema-grade triple camera system and all-day battery life. Features a pro-level processor. LIMITED TIME OFFER: Get this discounted price today!',
      oldPrice: 999,
      price: 649,
      image: 'assets/fontawesome/images/3.png',
      btnColor: '#e02f75',
    },
  ];

  get activeDeal(): DealSlide {
    return this.deals[this.currentIndex];
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.deals.length) % this.deals.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.deals.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  buyDeal(deal: DealSlide): void {
    const product: IProduct = {
      _id: deal.id,
      name: `${deal.titleLine1} ${deal.titleLine2}`,
      price: deal.price,
      description: deal.description,
      image: deal.image,
      category: deal.category,
      quantity: 15,
      tags: ['featured', 'deal'],
      isdeleted: false,
    };
    this.cartService.addToCart(product, 1);
    this.toast.success(`${product.name} added to your cart`, 'Featured Deal');
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}

