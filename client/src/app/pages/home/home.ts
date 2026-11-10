import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBar } from '../../components/search-bar/search-bar';
@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, RouterLink, RouterLinkActive, SearchBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home { }
