import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Agent, EasyAgent } from 'src/app/model/agent';
import { ProfileImageSize } from '../profile-img/profile-img.component';
import { urlAvatar } from 'src/app/util';

@Component({
  selector: 'app-profile-text-all-with-icon',
  templateUrl: './profile-text-all-with-icon.component.html',
  styleUrls: ['./profile-text-all-with-icon.component.scss']
})
export class ProfileTextAllWithIconComponent implements OnInit, AfterViewInit {

  @Input()
  public width: string;

  @Input()
  public paddingBetween: number;

  @Input()
  public linesDescription: number;

  @Input()
  public agent: EasyAgent;

  @Input()
  public nameOnly: boolean;

  @Input()
  public imgMode: ProfileImageSize;

  @Output()
  public clickMain: EventEmitter<void>;

  @ViewChild('leftBox')
  private domLeft: ElementRef;

  @ViewChild('rightBox')
  private domRight: ElementRef;

  @ViewChild('mainBox')
  private domMain: ElementRef;

  constructor() {
    this.linesDescription = 1;
    this.nameOnly = false;
    this.paddingBetween = 10;
    this.clickMain = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const cssLeft = getComputedStyle(this.domLeft.nativeElement);
    this.domRight.nativeElement.style['padding-left'] = `${parseInt(cssLeft.width, 10) + this.paddingBetween}px`;
  }

  public urlImage(): string {
    return urlAvatar(this.agent.externalId, this.agent.avatarType, this.imgMode);
  }
}
