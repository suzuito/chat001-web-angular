import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

export const defaultImageURL = `${locationRootURL()}/assets/ss.png`;
export const defaultTitle = 'みんなのチャット';
export const defaultSubTitle = 'アカウントのいらない昔ながらのチャットサービス';

export interface MetaBase {
  description: string;
  keywords: string;
}

function locationRootURL(): string {
  const t = document.createElement('a');
  t.href = location.href;
  return t.origin;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private meta: Meta,
  ) {
  }

  public setBase(m: MetaBase): void {
    Object.keys(m as any).forEach((k: string) =>
      this.meta.removeTag(`name="${k}"`));
    Object.keys(m as any).forEach((k: string) =>
      this.meta.addTag({ name: `${k}`, content: m[k] }));
  }

}
