import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat001-web-angular';
  tests = [];
  constructor() {
    for (let i = 0; i < 1000; i++) {
      this.tests.push(`var-${i}`);
    }
  }
}
