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
  public linesDescription: number;

  @Input()
  public agentName: string;

  @Input()
  public agentDescription: string;

  @Input()
  public nameOnly: boolean;

  @Input()
  public padding: string;

  @Input()
  public displayAvatar: boolean;

  @Input()
  public displayEditButton: boolean;

  @Output()
  public clickEdit: EventEmitter<void>;

  @ViewChild('description')
  public elemDescription: ElementRef;

  @ViewChild('name')
  public elemName: ElementRef;

  @ViewChild('card')
  public elemCard: ElementRef;

  constructor() {
    this.linesDescription = null;
    this.nameOnly = false;
    this.displayAvatar = true;
    this.displayEditButton = false;
    this.padding = '10px';
    this.clickEdit = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.resetDescriptionHeight();
    this.resetNameWidth();
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

  private resetNameWidth(): void {
    const styleCard: CSSStyleDeclaration = getRealStyle(this.elemCard);
    const styleName: CSSStyleDeclaration = getRealStyle(this.elemName);
    const cardWidth = parseInt(styleCard.width, 10);
    const preWidth = parseInt(styleName.width, 10);
    console.log(parseInt(this.padding, 10));
    console.log(this.elemName.nativeElement.style.width);
    console.log(cardWidth);
    if (preWidth < cardWidth - 2 * parseInt(this.padding, 10)) {
      return;
    }
    this.elemName.nativeElement.style.width = `${cardWidth - 2 * parseInt(this.padding, 10)}px`;
  }

}
