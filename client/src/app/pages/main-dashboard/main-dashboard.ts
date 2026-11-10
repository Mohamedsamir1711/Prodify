import { Component } from '@angular/core';
import {Navbar} from "../../components/navbar/navbar";
import { Footer } from '../../components/footer/footer';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  imports: [Navbar, Footer, RouterLink, RouterLinkActive],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.css',
})
export class MainDashboard {}
