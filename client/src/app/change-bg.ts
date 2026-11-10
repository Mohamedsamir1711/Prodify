import { Directive, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBg implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #ccc');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '8px');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'shadow-lg');
    this.renderer.addClass(this.el.nativeElement, 'hvr-grow');

  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'shadow-lg');
    this.renderer.removeClass(this.el.nativeElement, 'hvr-shrink');

  }
}
