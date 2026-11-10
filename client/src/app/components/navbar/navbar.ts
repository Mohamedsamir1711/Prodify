import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {
  drop = false;

  toggleDropDown() {
    this.drop = !this.drop;
  }
}
