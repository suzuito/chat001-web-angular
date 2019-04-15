import { Injectable } from '@angular/core';

export enum LocalStorageKey {
  A = 'at',
  SETTING = 'setting',
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get(k: LocalStorageKey): string {
    const ret: string = localStorage.getItem(k);
    if (!ret) { return ''; }
    if (ret.length === 0) { return ''; }
    return ret;
  }

  public set(k: LocalStorageKey, v: string) {
    if (!v) {
      return;
    }
    localStorage.setItem(k, v);
  }

  public delete(k: LocalStorageKey): void {
    localStorage.removeItem(k);
  }

  public empty(k: LocalStorageKey): boolean {
    return !localStorage.getItem(k);
  }

}
