import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  apiLinkLocal = "http://localhost:3000";
  apiLink = 'https://prodify-back.vercel.app';

  login (user:any) {
      return this.http.post(`${this.apiLink}/auth/login`, user);
  }

  signup (user:any) {
    return this.http.post(`${this.apiLink}/auth/signup`, user);
  }
}
