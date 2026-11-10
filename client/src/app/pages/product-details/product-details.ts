import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { IProduct } from '../../models/iproduct';
import { Card } from '../../components/card/card';
import { CurrencyPipe } from '@angular/common';
import { DeleteModel } from "../../components/delete-model/delete-model";
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-product-details',
  imports: [Card, CurrencyPipe, RouterLink, DeleteModel, Navbar, Footer],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  id = ""
  product!: IProduct
  productDetails = true
  constructor(private route: ActivatedRoute, private _productServices: ProductService, private chn: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (data:any) => {this.id = data.params.id
      this._productServices.getOneProduct(this.id).subscribe({
        next: (data:any) => {
          this.product = data.data
          this.chn.detectChanges()
        },
        error: (err:any) => console.error('Error fetching product:', err)
      })
    }
    })
  }

}
