import { Injectable, ElementRef } from '@angular/core';
import { getRealStyle } from '../util';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SideMenuWidthService {

  public elem: MatSidenav;
  public sideNavWidth: number;

  constructor(
  ) {
    this.elem = null;
    this.sideNavWidth = 0;
  }

  public width(): number {
    if (this.elem === null) {
      return 0;
    }
    if (this.elem.opened && this.elem.mode === 'side') {
      return this.sideNavWidth;
    }
    return 0;
  }
}
