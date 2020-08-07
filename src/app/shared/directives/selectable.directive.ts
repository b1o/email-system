import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appSelectable]'
})
export class SelectableDirective {
  @Input() selectableColor = 'blue';

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.elementRef.nativeElement.style.border = '2px solid';
    this.elementRef.nativeElement.style.borderColor = this.selectableColor;
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.elementRef.nativeElement.style.border = '';
  }
}
