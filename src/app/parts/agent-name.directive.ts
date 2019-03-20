import { Directive, ElementRef, HostListener, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appAgentName]'
})
export class AgentNameDirective implements OnInit {

  @Input()
  public oneLine: boolean;

  @Input()
  public width: string;

  constructor(
    private el: ElementRef,
  ) {
    this.oneLine = true;
    this.el.nativeElement.className = 'mat-body-2';
    // this.el.nativeElement.style['font-weight'] = 'normal';
  }

  ngOnInit(): void {
    if (this.oneLine) {
      this.el.nativeElement.style['white-space'] = 'nowrap';
      this.el.nativeElement.style.overflow = 'hidden';
      this.el.nativeElement.style['text-overflow'] = 'ellipsis';
      this.el.nativeElement.style.width = this.width;
      // this.el.nativeElement.style.border = '1px solid red'; // debug
    }
  }
}
