import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appRoomName]'
})
export class RoomNameDirective implements OnInit {

  @Input()
  private oneLine: boolean;

  @Input()
  private width: string;

  constructor(
    private el: ElementRef,
  ) {
    this.oneLine = true;
    this.el.nativeElement.className = 'mat-body-2';
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
