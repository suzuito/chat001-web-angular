import { ElementRef } from '@angular/core';

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
