import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { IProduct } from '../../models/iproduct';
import { DeleteModel } from '../../components/delete-model/delete-model';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, DeleteModel, Navbar, Footer],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _productServices = inject(ProductService);
  private cartService = inject(CartService);
  private toast = inject(ToastrService);
  private chn = inject(ChangeDetectorRef);

  id = '';
  product!: IProduct;
  qty = 1;

  fallbackMap: Record<string, IProduct> = {
    'sample-1': {
      _id: 'sample-1',
      name: 'Hardcover Bullet Journal',
      price: 25,
      description:
        'Premium dotted paper notebook with a lay-flat spine, ribbon marker and archival ink-friendly pages. Designed for daily reflection, sketching and structured planning.',
      image:
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
      category: 'Stationery',
      quantity: 30,
      tags: ['stationery', 'notebook', 'minimal'],
      isdeleted: false,
    },
    'sample-2': {
      _id: 'sample-2',
      name: 'Eco-Friendly Yoga Mat',
      price: 40,
      description:
        'Non-slip eco-friendly yoga mat with generous cushioning, made from sustainably harvested natural rubber for stability across every posture.',
      image:
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
      category: 'Fitness',
      quantity: 20,
      tags: ['fitness', 'yoga', 'eco'],
      isdeleted: false,
    },
    'sample-3': {
      _id: 'sample-3',
      name: 'High-Capacity Power Bank',
      price: 35,
      description:
        '20000mAh portable charger with fast-charge output and dual USB ports. Compact anodized shell built for travel and everyday carry.',
      image:
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80',
      category: 'Electronics',
      quantity: 45,
      tags: ['electronics', 'charger'],
      isdeleted: false,
    },
    'sample-4': {
      _id: 'sample-4',
      name: 'Genuine Leather Wallet',
      price: 45,
      description:
        'Minimalist genuine leather bifold wallet with built-in RFID protection, full-grain vegetable-tanned hide and hand-stitched edges.',
      image:
        'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
      category: 'Fashion',
      quantity: 18,
      tags: ['fashion', 'leather'],
      isdeleted: false,
    },
    'sample-5': {
      _id: 'sample-5',
      name: 'Waterproof Fitness Tracker',
      price: 50,
      description:
        'Slim fitness band with continuous heart rate monitoring, sleep tracking, 5ATM water resistance and 7-day battery life.',
      image:
        'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=900&q=80',
      category: 'Wearables',
      quantity: 25,
      tags: ['wearables', 'fitness'],
      isdeleted: false,
    },
    'sample-6': {
      _id: 'sample-6',
      name: 'Gaming Mouse',
      price: 60,
      description:
        'Ergonomic gaming mouse with subtle RGB lighting, programmable buttons and ultra-precise optical sensor.',
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
      category: 'Accessories',
      quantity: 35,
      tags: ['accessories', 'gaming'],
      isdeleted: false,
    },
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data: any) => {
        this.id = data.params.id;
        if (this.fallbackMap[this.id]) {
          this.product = this.fallbackMap[this.id];
          this.chn.detectChanges();
          return;
        }
        this._productServices.getOneProduct(this.id).subscribe({
          next: (res: any) => {
            this.product = res?.data || this.fallbackMap['sample-1'];
            this.chn.detectChanges();
          },
          error: () => {
            this.product = this.fallbackMap['sample-1'];
            this.chn.detectChanges();
          },
        });
      },
    });
  }

  changeQty(delta: number): void {
    const next = this.qty + delta;
    if (next >= 1 && next <= 99) {
      this.qty = next;
    }
  }

  addToCart(): void {
    if (!this.product) return;
    this.cartService.addToCart(this.product, this.qty);
    this.toast.success(
      `${this.qty} × ${this.product.name} added to your cart`,
      'Added to Cart'
    );
  }

  buyNow(): void {
    if (!this.product) return;
    this.cartService.addToCart(this.product, this.qty);
    this.router.navigate(['/checkout']);
  }
}
