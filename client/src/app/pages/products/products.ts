import { ChangeDetectorRef, Component, Input, OnInit, signal, } from '@angular/core';
import {Card} from '../../components/card/card';
import { ProductService } from '../../services/product-service';
import { startWith, Subject, Subscription } from 'rxjs'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchBar } from '../../components/search-bar/search-bar';
import { switchMap } from 'rxjs';
import { Filter } from '../../components/filter/filter';
import { Sort } from '../../components/sort/sort';
import { Pagination } from "../../components/pagination/pagination";
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-products',
  imports: [Card, CommonModule, RouterLink, SearchBar, Filter, Sort, Pagination, Navbar, Footer],
  templateUrl: './products.html',
  styleUrl: './products.css',
})

export class Products implements OnInit {
  queryChange$: Subject<any> = new Subject()
  query:any={page:1, limit:6};
  product: any = [];
  total!: number;
  constructor( private _productServices: ProductService, private chn: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.queryChange$.pipe(startWith(null), switchMap(() => this._productServices.getProducts(this.query))).subscribe({
      next: (res: any) => {
        console.log('Full API Response:', res);
        console.log('Trying to access res.data.products:', res.data?.products);
        console.log('Query being sent:', this.query);
        this.product = res.data;
        this.total = res.productCount;
        this.chn.detectChanges();
      },
      error: (err: any) => {
        console.error('Error fetching products:', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
      }
    });
  }

  searching(value: string)  {
    this.query.page = 1;
    if (value) {
      this.query.search = value;
      this.queryChange$.next(this.query);
    } else {
      delete this.query.search;
      this.queryChange$.next(this.query);
    }
  }
  sorting(value: string)  {
    this.query.page = 1;
    if (value) {
      this.query.sort = value;
    } else {
      delete this.query.sort;
    }
    this.queryChange$.next(this.query);

  }

  filtering(value: string)  {
    this.query.page = 1;
    if (value && value != 'all') {
      this.query.category = value;
      this.queryChange$.next(this.query);
    } else {
      delete this.query.category;
      this.queryChange$.next(this.query);

    }
  }

  pagination(obj:any) {
    this.query.page = obj.page;
    this.query.limit = obj.limit;
    this.queryChange$.next(this.query);
  }

}
