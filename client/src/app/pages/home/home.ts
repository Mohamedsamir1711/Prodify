import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FeaturedDeals } from '../../components/featured-deals/featured-deals';
import { Filter } from '../../components/filter/filter';
import { Sort } from '../../components/sort/sort';
import { Card } from '../../components/card/card';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { IProduct } from '../../models/iproduct';
import { ToastrService } from 'ngx-toastr';
import { Subject, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Navbar,
    Footer,
    FeaturedDeals,
    Filter,
    Sort,
    Card,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toast = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  queryChange$ = new Subject<any>();
  query: any = { page: 1, limit: 6 };

  fallbackProducts: IProduct[] = [
    {
      _id: 'sample-1',
      name: 'Hardcover Bullet Journal',
      price: 25,
      description:
        'Premium dotted paper notebook with a lay-flat spine, ribbon marker and archival ink-friendly pages.',
      image:
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      category: 'Stationery',
      quantity: 30,
      tags: ['stationery', 'notebook'],
      isdeleted: false,
    },
    {
      _id: 'sample-2',
      name: 'Eco-Friendly Yoga Mat',
      price: 40,
      description:
        'Non-slip eco-friendly yoga mat with generous cushioning, made from sustainably harvested natural rubber.',
      image:
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
      category: 'Fitness',
      quantity: 20,
      tags: ['fitness', 'yoga'],
      isdeleted: false,
    },
    {
      _id: 'sample-3',
      name: 'High-Capacity Power Bank',
      price: 35,
      description:
        '20000mAh portable charger with fast-charge output and dual USB ports for travel and everyday carry.',
      image:
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',
      category: 'Electronics',
      quantity: 45,
      tags: ['electronics', 'charger'],
      isdeleted: false,
    },
    {
      _id: 'sample-4',
      name: 'Genuine Leather Wallet',
      price: 45,
      description:
        'Minimalist genuine leather bifold wallet with built-in RFID protection and hand-stitched edges.',
      image:
        'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
      category: 'Fashion',
      quantity: 18,
      tags: ['fashion', 'leather'],
      isdeleted: false,
    },
    {
      _id: 'sample-5',
      name: 'Waterproof Fitness Tracker',
      price: 50,
      description:
        'Slim fitness band with continuous heart rate monitoring, sleep tracking and 7-day battery life.',
      image:
        'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
      category: 'Wearables',
      quantity: 25,
      tags: ['wearables', 'fitness'],
      isdeleted: false,
    },
    {
      _id: 'sample-6',
      name: 'Gaming Mouse',
      price: 60,
      description:
        'Ergonomic gaming mouse with RGB lighting, programmable buttons and ultra-precise optical sensor.',
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      category: 'Accessories',
      quantity: 35,
      tags: ['accessories', 'gaming'],
      isdeleted: false,
    },
  ];

  products: IProduct[] = [...this.fallbackProducts];
  total = 6;

  ngOnInit(): void {
    this.queryChange$
      .pipe(
        startWith(null),
        switchMap(() => this.productService.getProducts(this.query))
      )
      .subscribe({
        next: (res: any) => {
          if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
            this.products = res.data;
            this.total = res.productCount ?? res.data.length;
          } else {
            this.applyLocalFilterAndSort();
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.applyLocalFilterAndSort();
          this.cdr.detectChanges();
        },
      });
  }

  private applyLocalFilterAndSort(): void {
    let list = [...this.fallbackProducts];
    if (this.query.category) {
      list = list.filter(
        (p) => p.category.toLowerCase() === this.query.category.toLowerCase()
      );
    }
    if (this.query.sort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.query.sort === '-name') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.query.sort === 'price') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.query.sort === '-price') {
      list.sort((a, b) => b.price - a.price);
    }
    this.products = list;
    this.total = list.length;
  }

  filtering(value: string): void {
    this.query.page = 1;
    if (value && value !== 'all') {
      this.query.category = value;
    } else {
      delete this.query.category;
    }
    this.queryChange$.next(this.query);
  }

  sorting(value: string): void {
    this.query.page = 1;
    if (value) {
      this.query.sort = value;
    } else {
      delete this.query.sort;
    }
    this.queryChange$.next(this.query);
  }

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product, 1);
    this.toast.success(`${product.name} added to cart`, 'Added to Cart');
  }
}
