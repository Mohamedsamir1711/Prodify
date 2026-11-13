import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeTrunc } from '../../pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [PipeTrunc, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements OnInit {
  @Input() product!: any;
  @Input() productDetails!: boolean;

  ngOnInit(): void {}
}
