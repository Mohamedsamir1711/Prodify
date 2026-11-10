import { Directive, OnChanges, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPipe]',
})

export class PipeTrunc implements OnChanges {
  @Input() product!: any
  @Input() trunc: number = 30


  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {

    const text = this.product?.description 
    const truncated = text.length > this.trunc ? text.substring(0, this.trunc) + '...' : text;

    this.renderer.setProperty(this.el.nativeElement, 'innerText', truncated);
  }

  }

