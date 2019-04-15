import { Injectable } from '@angular/core';
import { LocalStorageKey, LocalStorageService } from './local-storage.service';

export interface Setting {
  mute: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private obj: Setting;

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    if (!this.localStorageService.empty(LocalStorageKey.SETTING)) {
      this.load();
    } else {
      this.obj = {
        mute: false,
      } as Setting;
    }
  }

  public get mute(): boolean {
    return this.obj.mute;
  }
  public set mute(b: boolean) {
    this.obj.mute = b;
    this.save();
  }

  private save(): void {
    this.localStorageService.set(LocalStorageKey.SETTING, JSON.stringify(this.obj));
  }

  public load(): void {
    const b = this.localStorageService.get(LocalStorageKey.SETTING);
    this.obj = JSON.parse(b);
  }
}
