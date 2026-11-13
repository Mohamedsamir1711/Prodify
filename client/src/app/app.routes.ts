import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Dashboard } from './layouts/dashboard/dashboard';
import { MainDashboard } from './pages/main-dashboard/main-dashboard';
import { ProductDetails } from './pages/product-details/product-details';
import { AddProduct } from './pages/add-product/add-product';
import { UpdateProduct } from './pages/update-product/update-product';
import { Login } from './pages/login/login';
import { Error } from './pages/error/error';
import { authGuard } from './guards/auth-guard';
import { Signup } from './pages/signup/signup';
import { DeleteProduct } from './components/delete-product/delete-product';
import { Setting } from './pages/setting/setting';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Orders } from './pages/orders/orders';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'products/new', component: AddProduct },
  { path: 'products/:id/edit', component: UpdateProduct },
  { path: 'products/:id', component: ProductDetails },
  { path: 'products/:id/delete', component: DeleteProduct },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'orders', component: Orders },
  { path: 'account', component: Setting },
  { path: 'settings', component: Setting },
  { path: 'auth/login', component: Login },
  { path: 'auth/signup', component: Signup },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    component: Dashboard,
    children: [
      { path: 'dashboard', component: MainDashboard, canActivate: [authGuard] },
    ],
  },
  { path: '**', component: Error },
];
