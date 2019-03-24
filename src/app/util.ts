import { ElementRef } from '@angular/core';
import { Params } from '@angular/router';
import { Agent, AvatarType } from './model/agent';
import { environment } from 'src/environments/environment';
import { ProfileImageSize } from './parts/profile-img/profile-img.component';

export function getRealStyle(elem: ElementRef): CSSStyleDeclaration {
  const d: HTMLElement = elem.nativeElement;
  return window.getComputedStyle(d);
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomRoomName(): string {
  const names = [
    '暇人集合',
    'まったりチャット',
    'XXXについて語ろう',
    '真面目トーク',
    'わいわい楽しく',
    'エロあり',
  ];
  const i = getRandomInt(0, names.length - 1);
  return names[i];
}

export function randomRoomDescription(): string {
  const names = [
    'いかがお過ごしですか？',
    '暇すぎて死にそう',
    'お話聞きたいです',
    'マイペースでいきましょう',
    '(^^)',
    '大人の人だけご入室ください',
  ];
  const i = getRandomInt(0, names.length - 1);
  return names[i];
}


export function getWSURLFromEnv(env: any, agentID: string) {
  return `${env.protocol}://${env.hostname}:${env.port}/ws/${agentID}`;
}

export function ParamAsNumber(params: Params, key: string, dflt: number): number {
  let ret = -1;
  try {
    ret = parseInt(params[key], 10);
  } catch (err) {
    ret = dflt;
  }
  return ret;
}


export function urlAvatar(externalId: string, custom: AvatarType, size: ProfileImageSize): string {
  return `https://storage.googleapis.com/${environment.bucket}/avatar/${externalId}/${custom}/${size}.jpg`;
}
