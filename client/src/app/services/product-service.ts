import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}
  apiLinkLocal = `http://localhost:3000/products`
  apiLink  = 'https://prodify-back.vercel.app/products'

  getProducts (query?: any) {
    let params = new HttpParams();
    if (query) {
      if (query.page) params = params.set('page', query.page);
      if (query.limit) params = params.set('limit', query.limit);
      if (query.search) params = params.set('search', query.search);
      if (query.sort) params = params.set('sort', query.sort);
      if (query.category) params = params.set('category', query.category);
    }
    return this._http.get(this.apiLink, { params })
  }

  getOneProduct (id: string) {
    return this._http.get(`${this.apiLink}/${id}`)
  }

  addProduct (product:Omit<IProduct, '_id'>) {
    return this._http.post(this.apiLink, product)
  }

  updateProduct (id: string, product:Omit<IProduct, '_id'>) {
    return this._http.patch(`${this.apiLink}/${id}`, product)
  }

  deleteProduct (id: string) {
    return this._http.delete(`${this.apiLink}/${id}`)
  }

}
