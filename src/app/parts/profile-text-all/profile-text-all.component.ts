import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-profile-text-all',
  templateUrl: './profile-text-all.component.html',
  styleUrls: ['./profile-text-all.component.scss']
})
export class ProfileTextAllComponent implements OnInit, AfterViewInit {

  @Input()
  public width: string;

  @Input()
  public linesDescription: number;

  @Input()
  public agentName: string;

  @Input()
  public agentDescription: string;

  @Input()
  public nameOnly: boolean;

  @Input()
  public displayAvatar: boolean;

  @ViewChild('description')
  public elemDescription: ElementRef;

  constructor() {
    this.linesDescription = null;
    this.nameOnly = false;
    this.displayAvatar = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.resetDescriptionHeight();
  }

  private resetDescriptionHeight(): void {
    if (this.nameOnly) {
      return;
    }
    if (!this.linesDescription) {
      return;
    }
    if (this.linesDescription <= 0) {
      return;
    }
    const d: HTMLDivElement = this.elemDescription.nativeElement;
    const s: CSSStyleDeclaration = window.getComputedStyle(d);
    const preLineHeight = parseInt(s.height, 10);
    const afterLineHeight = parseInt(s.lineHeight, 10);
    if (preLineHeight < afterLineHeight) {
      return;
    }
    d.style.height = `${afterLineHeight * this.linesDescription}px`;
  }

}
