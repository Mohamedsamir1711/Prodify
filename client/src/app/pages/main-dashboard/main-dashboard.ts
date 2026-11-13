import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.css',
})
export class MainDashboard {
  stats = [
    { label: 'Total Revenue', value: '$14,820', change: '+12.4%' },
    { label: 'Active Products', value: '24', change: '+3 new' },
    { label: 'Orders This Month', value: '86', change: '+18.2%' },
    { label: 'Customer Satisfaction', value: '98.4%', change: 'Top rated' },
  ];
}
