import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { getRealStyle } from 'src/app/util';
import { MatCard } from '@angular/material';

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

  @ViewChild('description')
  public elemDescription: ElementRef;

  constructor() {
    this.width = '100%';
    this.linesDescription = null;
    this.nameOnly = false;
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
    const s: CSSStyleDeclaration = getRealStyle(this.elemDescription);
    const preLineHeight = parseInt(s.height, 10);
    const afterLineHeight = parseInt(s.lineHeight, 10);
    if (preLineHeight < afterLineHeight) {
      return;
    }
    this.elemDescription.nativeElement.style.height = `${afterLineHeight * this.linesDescription}px`;
  }

}
