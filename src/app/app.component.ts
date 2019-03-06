import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public tests: string[];

  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  constructor() {
    this.tests = [];
    for (let i = 0; i < 1000; i++) {
      this.tests.push(`var-${i}`);
    }
  }

  public openSidenav(): void {
    this.sidenav.toggle();
  }
}
