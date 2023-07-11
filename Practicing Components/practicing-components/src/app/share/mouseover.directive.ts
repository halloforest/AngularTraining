import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appMouseover]'
})
export class MouseoverDirective {
  @HostBinding('class.hovered') isHovered = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
    this.renderer.addClass(this.elRef.nativeElement, 'mouseover-effect');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
    this.renderer.removeClass(this.elRef.nativeElement, 'mouseover-effect');
  }
}
