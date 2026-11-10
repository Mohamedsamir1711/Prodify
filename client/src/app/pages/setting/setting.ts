import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-setting',
  imports: [Navbar, Footer],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {}
