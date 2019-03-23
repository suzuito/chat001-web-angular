import { Injectable } from '@angular/core';
import { MatSidenavContent } from '@angular/material';
import { ExtendedScrollToOptions } from '@angular/cdk/scrolling';

export interface ScrollPosition {
  top: number;
  left: number;
}

export const ScrollIdTop = 'top';
export const ScrollIdRooms = 'rooms';
export const ScrollIdAgents = 'agents';
export const ScrollIdAgentMessages = 'agentMessages';
export const ScrollIdRoomCreator = 'roomCreator';
export const ScrollIdRoomEntrance = 'roomEntrance';
export const ScrollIdRoomMessages = 'roomMessages';
export const ScrollIdRoomInfo = 'roomInfo';
export const ScrollIdRoomMembers = 'roomMembers';

export function byRoomId(baseScrollId: string, roomId: string): string {
  return `${baseScrollId}-${roomId}`;
}

@Injectable({
  providedIn: 'root'
})
export class SideMenuScrollService {

  private el: MatSidenavContent;
  private scrolls: Map<string, ScrollPosition>;

  constructor() {
    this.scrolls = new Map<string, ScrollPosition>();
    this.el = null;
  }

  public init(el: MatSidenavContent): void {
    this.el = el;
    // this.el.elementScrolled().subscribe((v) => {
    //   // console.log(this.el.measureScrollOffset('top'), this.el.getElementRef().nativeElement.scrollHeight);
    //   console.log(
    //     this.el.measureScrollOffset('bottom'),
    //     this.el.measureScrollOffset('top'),
    //   );
    // }); // debug
  }

  private scrollTo(opts: ExtendedScrollToOptions): void {
    if (!this.el) {
      // throw new Error(`Cannot found ElementRef: ${id}`);
      return;
    }
    this.el.scrollTo(opts);
  }

  public saveScrollPos(id: string): void {
    const data: ScrollPosition = {
      top: this.el.measureScrollOffset('top'),
      left: this.el.measureScrollOffset('left'),
    };
    console.log('save:', id, data.top, data.left);
    this.scrolls.set(id, data);
  }

  public loadScrollPosInit(id: string, left: number, top: number): void {
    this.scrollTo({
      top,
      left,
      behavior: 'auto',
    } as ScrollToOptions);
  }

  public loadScrollPos(id: string, bottomOnInit: boolean = true): void {
    let ret: ScrollPosition = { top: 0, left: 0 };
    if (bottomOnInit && this.el) {
      ret.top = this.el.getElementRef().nativeElement.scrollHeight;
      ret.left = this.el.getElementRef().nativeElement.scrollWidth;
    } else {
      ret.top = 0;
      ret.left = 0;
    }
    if (this.scrolls.has(id)) {
      ret = this.scrolls.get(id);
    }
    console.log('load:', id, ret.top, ret.left);
    this.scrollTo({
      top: ret.top,
      left: ret.left,
      behavior: 'auto',
    } as ScrollToOptions);
  }

  public isBottom(): boolean {
    return 0 === this.el.measureScrollOffset('bottom');
  }
}
