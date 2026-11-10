import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import {Main} from './layouts/main/main'
import { Dashboard } from './layouts/dashboard/dashboard';
import { MainDashboard } from './pages/main-dashboard/main-dashboard';
import { ProductDetails } from './pages/product-details/product-details';
import { AddProduct } from './pages/add-product/add-product';
import { UpdateProduct } from './pages/update-product/update-product';
import { Login } from './pages/login/login';
import { Error } from './pages/error/error';
import { authGuard } from './guards/auth-guard';
import { Signup } from './pages/signup/signup';
import { DeleteProduct} from './components/delete-product/delete-product';
import { Setting } from './pages/setting/setting';


export const routes: Routes = [
      {path:"", component: Home},
      {path:"home", component: Home},
      {path:"products", component: Products},
      {path:"products/new", component: AddProduct},
      {path:"products/:id/edit", component: UpdateProduct},
      {path:"products/:id", component: ProductDetails},
      {path:"products/:id/delete", component: DeleteProduct},
  {path:"auth/login", component: Login},
  {path: "auth/signup", component: Signup},
  {path:"settings", component: Setting},
  {path:"admin", redirectTo:"dashboard", pathMatch: "full"},
  {path:"admin", component: Dashboard, children: [
    {path: "dashboard", component: MainDashboard, canActivate: [authGuard]},
  ]},
  {path:"**" , component:Error}

];
