import { Pipe, PipeTransform } from '@angular/core';
import { stringPaddedNumber } from '../util/date';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'datetimeString', pure: false })
export class DatetimeStringPipe implements PipeTransform {
  transform(ts: number, includeTime: boolean = false): string {
    const current = new Date();
    current.setTime(ts * 1000);
    let str = '';
    const y = current.getFullYear();
    const m = stringPaddedNumber(current.getMonth() + 1, 2);
    const d = stringPaddedNumber(current.getDate(), 2);
    const h = stringPaddedNumber(current.getHours(), 2);
    const M = stringPaddedNumber(current.getMinutes(), 2);
    const s = stringPaddedNumber(current.getSeconds(), 2);
    str += `${y}/${m}/${d}`;
    if (includeTime) {
      str += ` ${h}:${M}:${s}`;
    }
    return str;
  }
}

@Pipe({ name: 'safeIframeSource' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
