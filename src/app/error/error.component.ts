import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(
    public errorService: ErrorService,
  ) { }

  ngOnInit() {
  }

  public title(): string {
    if (!this.errorService.title) {
      return 'ErrorPage';
    }
    return this.errorService.title;
  }

  public head(): string {
    if (!this.errorService.title) {
      return 'ErrorPage';
    }
    return this.errorService.title;
  }

  public body(): string {
    if (!this.errorService.body) {
      return '';
    }
    return this.errorService.body;
  }

  public reload(): string {
    if (!this.errorService.body) {
      return 'リロード';
    }
    return this.errorService.reload;
  }

  public reloadURL(): string {
    if (!this.errorService.reloadURL) {
      return '/';
    }
    return this.errorService.reloadURL;
  }

}
