import { EasyAgent } from './agent';
import { Room } from './room';

export enum LineType {
  Spans = 1,
  Request1on1 = 2,
  RoomIntroduction = 3,
}

export interface Line {
  readonly type: LineType;
  readonly data: string;
  obj: any;
}

export interface LineDataRoomIntroduction {
  readonly agent: EasyAgent;
  readonly room: Room;
}

