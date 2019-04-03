import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public title: string;
  public body: string;
  public reload: string;
  public reloadURL: string;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  public errp5XX(body: string = ''): void {
    this.title = 'InternalServerError';
    this.body = body;
    this.reloadURL = '/';
    this.reload = 'Reload';
    this.router.navigate(['error']);
  }

  private errp(
    title: string,
    body: string,
    reload: string,
    reloadURL: string,
  ): void {
    this.title = title;
    this.body = body;
    this.reloadURL = reloadURL;
    this.reload = reload;
    this.router.navigate(['error']);
  }

  public warn(msg: string): void {
    this.snackBar.open(
      msg,
      '',
      {
        duration: 3000,
      },
    );
  }
}
