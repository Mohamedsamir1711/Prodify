import { Component, PLATFORM_ID, inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { CartService } from '../../services/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Navbar, Footer],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting implements OnInit {
  cartService = inject(CartService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  activeTab: 'profile' | 'security' | 'orders' = 'profile';

  profile = {
    firstName: 'Asher',
    lastName: 'Brown',
    username: 'asher.brown',
    email: 'asher.brown@prodify.com',
    company: 'Nec Urna Suscipit Ltd',
    phone: '(537) 315-1481',
    address: 'P.O. Box 464, 5975 Eget Avenue',
    city: 'New York',
    state: 'NY',
    zip: '98232',
    bio: 'Product enthusiast & minimalist collector based in New York. Curating everyday essentials.',
  };

  passwords = {
    current: '',
    next: '',
    confirm: '',
  };

  recentOrders: any[] = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedOrders = localStorage.getItem('prodify_orders_v1');
      if (savedOrders) {
        try {
          this.recentOrders = JSON.parse(savedOrders);
        } catch {
          this.recentOrders = [];
        }
      }
      if (this.recentOrders.length === 0) {
        this.recentOrders = [
          {
            orderNumber: 'PD-842910',
            date: '2026-11-08',
            itemsCount: 2,
            total: 70,
            status: 'Delivered',
          },
          {
            orderNumber: 'PD-793104',
            date: '2026-10-24',
            itemsCount: 1,
            total: 299,
            status: 'Delivered',
          },
        ];
      }
    }
  }

  saveProfile(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'prodify_user',
        JSON.stringify({
          username: `${this.profile.firstName} ${this.profile.lastName}`,
          email: this.profile.email,
        })
      );
    }
    this.toast.success('Profile preferences saved', 'Account Updated');
  }

  updatePassword(): void {
    if (!this.passwords.current || !this.passwords.next) {
      this.toast.warning('Please fill in your password fields');
      return;
    }
    if (this.passwords.next !== this.passwords.confirm) {
      this.toast.error('New password and confirmation do not match');
      return;
    }
    this.passwords = { current: '', next: '', confirm: '' };
    this.toast.success('Password updated', 'Security');
  }

  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.toast.info('Signed out');
    this.router.navigate(['/auth/login']);
  }
}
