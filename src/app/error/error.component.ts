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
    return this.errorService.title;
  }

  public body(): string {
    return this.errorService.body;
  }

  public reload(): string {
    return this.errorService.reload;
  }

  public reloadURL(): string {
    return this.errorService.reloadURL;
  }

}
