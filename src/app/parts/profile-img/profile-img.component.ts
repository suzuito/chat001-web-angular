import { Component, OnInit, Input } from '@angular/core';

export enum ProfileImageSize {
  Small = 'small',
}

export function getProfileImageSizePx(s: ProfileImageSize): number {
  switch (s) {
    case ProfileImageSize.Small:
      return 50;
  }
  return 50;
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
