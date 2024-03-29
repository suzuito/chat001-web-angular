import { Directive, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
import { getRealStyle } from '../util';

@Directive({
  selector: '[appAgentDescription]'
})
export class AgentDescriptionDirective implements AfterViewInit {

  @Input()
  public linesDescription: number;

  @Input()
  private width: string;

  constructor(
    private el: ElementRef,
  ) {
    this.el.nativeElement.className = 'mat-body-1';
    // this.el.nativeElement.style['font-weight'] = 'normal';
    this.el.nativeElement.style.overflow = 'hidden';
    this.el.nativeElement.style['-webkit-hyphens'] = 'auto';
    this.el.nativeElement.style['-moz-hyphens'] = 'auto';
    this.el.nativeElement.style['-ms-hyphens'] = 'auto';
    this.el.nativeElement.style.hyphens = 'auto';
    this.linesDescription = 1;
    // this.el.nativeElement.style.border = '1px solid red'; // debug
  }

  ngAfterViewInit() {
    this.resetHeight();
  }

  public resetHeight(): void {
    this.el.nativeElement.style.width = this.width;
    const s: CSSStyleDeclaration = getRealStyle(this.el);
    const preLineHeight = parseInt(s.height, 10);
    const afterLineHeight = parseInt(s.lineHeight, 10);
    if (preLineHeight < afterLineHeight) {
      return;
    }
    this.el.nativeElement.style.height = `${afterLineHeight * this.linesDescription}px`;
  }

}
