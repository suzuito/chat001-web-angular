import { Component, OnInit, Input } from '@angular/core';

enum Mode {
  Small = 'small',
}

@Component({
  selector: 'app-profile-img',
  templateUrl: './profile-img.component.html',
  styleUrls: ['./profile-img.component.scss']
})
export class ProfileImgComponent implements OnInit {

  @Input()
  public mode: Mode;

  @Input()
  public src: string;

  constructor() { }

  ngOnInit() {
  }

  public sizeImg(): number {
    switch (this.mode) {
      case Mode.Small:
        return 50;
    }
    return 50;
  }

  public urlImg(): string {
    return this.src;
  }
}
