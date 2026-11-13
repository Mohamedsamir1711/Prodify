import { Component, PLATFORM_ID, inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  cartService = inject(CartService);
  private router = inject(Router);
  private toast = inject(ToastrService);
  private platformId = inject(PLATFORM_ID);

  mobileOpen = false;
  userInitials = 'AM';
  isLoggedIn = false;

  notifications = [
    { title: 'Limited offer: 50% off Featured Deals', time: 'Just now' },
    { title: 'Free shipping unlocked on orders over $120', time: '2h ago' },
    { title: 'New collection items added in Stationery & Tech', time: 'Yesterday' },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
      const storedUser = localStorage.getItem('prodify_user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          const name = parsed?.username || parsed?.email || '';
          if (name) {
            const parts = name.trim().split(/[\s._-]+/);
            this.userInitials =
              parts.length > 1
                ? (parts[0][0] + parts[1][0]).toUpperCase()
                : name.slice(0, 2).toUpperCase();
          }
        } catch {
          // keep default
        }
      }
    }
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  isHomeActive(): boolean {
    const url = this.router.url.split('?')[0];
    return url === '/' || url === '/home';
  }

  isProductsActive(): boolean {
    const url = this.router.url.split('?')[0];
    return url.startsWith('/products');
  }

  isAccountActive(): boolean {
    const url = this.router.url.split('?')[0];
    return (
      url.startsWith('/settings') ||
      url.startsWith('/account') ||
      url.startsWith('/auth') ||
      url.startsWith('/admin') ||
      url.startsWith('/orders')
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('prodify_user');
      this.isLoggedIn = false;
    }
    this.toast.info('Signed out of your account');
    this.router.navigate(['/auth/login']);
  }
}
