import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) { }

  apiLink = API_URL;

  login(user: any) {
    return this.http.post(`${this.apiLink}/auth/login`, user);
  }

  signup(user: any) {
    return this.http.post(`${this.apiLink}/auth/signup`, user);
  }
}
