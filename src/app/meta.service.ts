import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

export const defaultKeyWords = [
  'ChatSport',
  'chatspot',
  'chat spot',
  'Chat spot',
  'みんなのチャットルーム',
  'ボンクラ',
  '暇つぶしチャット',
  '暇つぶし',
  '暇',
  'ヒマ',
  '暇（ヒマ）',
  'チャット',
  'チャットルーム',
  'chat',
  'himachat',
];

export const defaultImageURL = `${locationRootURL()}/assets/ss.png`;
export const defaultTitle = '暇（ヒマ）';
export const defaultSubTitle = 'アカウントのいらない昔ながらのチャットサービス';

export interface MetaBase {
  description: string;
  keywords: string;
}

export interface MetaOG {
  image: string;
  url: string;
  title: string;
  description: string;
  type: string;
  locale: string;
  site_name: string;
}

export interface MetaTwitter {
  card: string;
  url: string;
  title: string;
  description: string;
  image: string;
}

function locationRootURL(): string {
  const t = document.createElement('a');
  t.href = location.href;
  return t.origin;
}

export const defaultMetaBase: MetaBase = {
  description: '人類の最大の敵とは何か？それは暇（ヒマ）だ。あなたを暇から救うためにこのサイトはやってきた。',
  keywords: defaultKeyWords.join(','),
};

export const defaultMetaOG: MetaOG = {
  url: `${locationRootURL()}/init`,
  title: defaultTitle + '|' + defaultSubTitle,
  description: 'アカウント登録不要。1対1でもグループでも楽しめる。あなただけのチャットルームを作って、お友達をどんどん誘っちゃおう！',
  image: defaultImageURL,
  type: 'website',
  locale: 'ja_jp',
  site_name: '暇（ヒマ）',
};

export const defaultMetaTwitter: MetaTwitter = {
  card: 'summary',
  url: `${locationRootURL()}/init`,
  title: defaultTitle + '|' + defaultSubTitle,
  description: 'アカウント登録不要。1対1でもグループでも楽しめる。あなただけのチャットルームを作って、お友達をどんどん誘っちゃおう！',
  image: defaultImageURL,
};

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

  public setTwitter(m: MetaTwitter): void {
    Object.keys(m as any).forEach((k: string) =>
      this.meta.removeTag(`name="twitter:${k}"`));
    Object.keys(m as any).forEach((k: string) =>
      this.meta.addTag({ name: `twitter:${k}`, content: m[k] }));
  }

  public setOG(m: MetaOG): void {
    Object.keys(m as any).forEach((k: string) =>
      this.meta.removeTag(`property="og:${k}"`));
    Object.keys(m as any).forEach((k: string) =>
      this.meta.addTag({ property: `og:${k}`, content: m[k] }));
  }
}
