import { Component, Input, OnInit } from '@angular/core';
import {ChangeBg} from '../../change-bg'
import { PipeTrunc } from '../../pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [ChangeBg, PipeTrunc, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements OnInit {

  @Input() product!:any;

  @Input() productDetails!: Boolean
 
  ngOnInit(): void {
  }
}
