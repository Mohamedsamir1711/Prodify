import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { IProduct } from '../../models/iproduct';
import { Navbar } from '../../components/navbar/navbar';
import { ToastrService } from 'ngx-toastr';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, RouterLink, Navbar, Footer],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  formData: Omit<IProduct, '_id'> = {
    name: '',
    price: 0,
    description: '',
    category: '',
    quantity: 0,
    image: '',
    isdeleted: false,
    tags: [],
  };

  constructor(
    private _productServices: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    this._productServices.addProduct(form.value).subscribe({
      next: () => {
        this.toastr.success('Product added successfully!', 'Success');
        form.reset();
        setTimeout(() => {
          this.router.navigateByUrl('/products');
        }, 1500);
      },
      error: (error) => {
        this.toastr.error(
          error?.error?.message || 'Unable to add product',
          'Cannot add this product'
        );
      },
    });
  }
}
