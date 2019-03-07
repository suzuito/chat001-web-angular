import { ElementRef } from '@angular/core';

export function getRealStyle(elem: ElementRef): CSSStyleDeclaration {
  const d: HTMLElement = elem.nativeElement;
  return window.getComputedStyle(d);
}
