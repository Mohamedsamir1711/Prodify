import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { ToastrService } from 'ngx-toastr';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, Navbar, Footer],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit {
  updateProduct!: FormGroup;
  id = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _productServices: ProductService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateProduct = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    this.route.paramMap.subscribe({
      next: (res: any) => {
        this.id = res.params.id;
        this._productServices.getOneProduct(this.id).subscribe({
          next: (res: any) => {
            if (res?.data) {
              this.updateProduct.patchValue({
                name: res.data.name,
                price: res.data.price,
                description: res.data.description,
                image: res.data.image,
                category: res.data.category,
              });
            }
          },
        });
      },
    });
  }

  checkInput(control: string): boolean {
    const c = this.updateProduct.get(control);
    return !!(c?.errors && (c?.touched || c?.dirty));
  }

  onSubmit(): void {
    this._productServices
      .updateProduct(this.id, this.updateProduct.value)
      .subscribe({
        next: () => {
          this.toast.success('Product updated successfully', 'Success');
          this.router.navigateByUrl('/products');
        },
        error: (err) => {
          this.toast.error(
            err?.error?.message || 'Unable to update product',
            'Cannot update this product'
          );
        },
      });
  }
}
