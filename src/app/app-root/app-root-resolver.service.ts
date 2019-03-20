import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Router, Resolve } from '@angular/router';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class AppRootResolverService implements Resolve<boolean> {

  constructor(
    private appService: AppService,
    private errService: ErrorService,
  ) { }

  public async resolve(): Promise<boolean> {
    return this.appService.initialize().then(() => {
      return true;
    }).catch((err) => {
      this.errService.errp5XX();
      return false;
    });
  }

}
