import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import{ ToastrService } from 'ngx-toastr';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, Navbar, Footer],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit {
    updateProduct!: FormGroup;
    id = ""

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
     private _productServices: ProductService,
    private toast: ToastrService,
  private router: Router) {
  }

  ngOnInit(): void {
    this.updateProduct = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(0)]],
      image: ['', [Validators.required, Validators.minLength(0)]],
      category: ['', [Validators.required, Validators.minLength(0)]],
    });

    this.route.paramMap.subscribe({
      next: (res:any) => {
        this.id = res.params.id
        this._productServices.getOneProduct(this.id).subscribe({
          next: (res:any) => {
            this.updateProduct.patchValue({
              name: res.data.name,
              price: res.data.price,
              description: res.data.description,
              image: res.data.image,
              category: res.data.category,
              quantity: res.data.quantity
            });
          },
          error: (err:any) => console.error('Error fetching product:', err)
        });
      }
    });
  }

  checkInput (control:string) {
    return this.updateProduct.get(control)?.errors && this.updateProduct.get(control)?.touched || this.updateProduct.get(control)?.dirty
  }

  onSubmit() {
this._productServices.updateProduct(this.id, this.updateProduct.value).subscribe({
  next: (res) => {
    this.toast.success('Product updated successfully', 'Success');
    this.router.navigateByUrl("/products")

  },
  error: (err) => {
    console.error('Error updating product:', err);
    this.toast.error(err.error.message, 'Cannot update this product');
  }
})}

  }
