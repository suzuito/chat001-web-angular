import { Component, OnInit, Input } from '@angular/core';

export enum ProfileImageSize {
  Small = 'small',
  Medium = 'medium',
}

export function getProfileImageSizePx(s: ProfileImageSize): number {
  switch (s) {
    case ProfileImageSize.Small:
      return 30;
    case ProfileImageSize.Medium:
      return 100;
  }
  return 30;
}

@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.scss']
})
export class ProfileImgComponent implements OnInit {

  @Input()
  public mode: ProfileImageSize;

  @Input()
  public src: string;

  constructor() { }

  ngOnInit() {
  }

  public sizeImg(): number {
    return getProfileImageSizePx(this.mode);
  }

  public urlImg(): string {
    return this.src;
  }
}
