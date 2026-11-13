import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  constructor(private router: Router) {}

  navigate(): void {
    this.router.navigate(['']);
  }
}
