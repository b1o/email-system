import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() highlightColor = 'yellow';

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.elementRef.nativeElement.style.backgroundColor = this.highlightColor;
  }

}
